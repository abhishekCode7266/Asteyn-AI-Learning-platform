import { db } from "./firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  orderBy 
} from "firebase/firestore";

export interface BookReview {
  id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  userRole?: 'student' | 'teacher';
  rating: number; // 1 to 5
  reviewText: string;
  tags?: string[];
  createdAt: string; // ISO date string
  verifiedReader?: boolean;
  helpfulCount?: number;
}

export function generateReviewId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `rev-${crypto.randomUUID()}`;
  }
  return `rev-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export const REVIEW_TAGS = [
  "Clear Concepts",
  "Great Solved Examples",
  "Exam Essential",
  "Must Read",
  "Detailed Derivations",
  "Easy to Understand",
  "Helped with Homework",
  "Comprehensive",
  "High Recommended"
];

// High-quality baseline peer reviews for core curriculum books
export const BASELINE_REVIEWS: BookReview[] = [
  {
    id: "rev-hc-1",
    bookId: "phy-1",
    bookTitle: "Concepts of Physics (Vol 1)",
    userId: "student-aarav",
    userName: "Aarav Sharma",
    userRole: "student",
    rating: 5,
    reviewText: "The absolute gold standard for mechanics and kinematics! The thought questions at the end of each chapter really forced me to rethink my intuition. A must for every science aspirant.",
    tags: ["Clear Concepts", "Exam Essential", "Must Read"],
    createdAt: "2026-09-15T10:30:00.000Z",
    verifiedReader: true,
    helpfulCount: 42
  },
  {
    id: "rev-hc-2",
    bookId: "phy-1",
    bookTitle: "Concepts of Physics (Vol 1)",
    userId: "student-riya",
    userName: "Riya Patel",
    userRole: "student",
    rating: 5,
    reviewText: "Derivations are so crisp and logical. After reading Chapter 3 on Newton's Laws, my problem-solving speed increased significantly.",
    tags: ["Detailed Derivations", "High Recommended"],
    createdAt: "2026-09-22T14:15:00.000Z",
    verifiedReader: true,
    helpfulCount: 19
  },
  {
    id: "rev-rd-1",
    bookId: "math-1",
    bookTitle: "Mathematics for Class 11",
    userId: "student-karan",
    userName: "Karan Verma",
    userRole: "student",
    rating: 5,
    reviewText: "Unmatched variety of practice problems. If you solve even 60% of the exercises in trigonometry and calculus, board exams feel like a breeze.",
    tags: ["Great Solved Examples", "Exam Essential"],
    createdAt: "2026-09-18T09:45:00.000Z",
    verifiedReader: true,
    helpfulCount: 31
  },
  {
    id: "rev-chem-1",
    bookId: "chem-1",
    bookTitle: "Modern Approach to Chemical Calculations",
    userId: "student-priya",
    userName: "Priya Nair",
    userRole: "student",
    rating: 5,
    reviewText: "The mole concept and redox chapters simplified everything. The step-by-step methods make physical chemistry fun rather than intimidating.",
    tags: ["Clear Concepts", "Helped with Homework"],
    createdAt: "2026-09-20T16:00:00.000Z",
    verifiedReader: true,
    helpfulCount: 24
  },
  {
    id: "rev-bio-1",
    bookId: "bio-1",
    bookTitle: "Trueman's Elementary Biology (Vol 1)",
    userId: "student-neha",
    userName: "Neha Sen",
    userRole: "student",
    rating: 4,
    reviewText: "Extremely detailed illustrations and cell diagrams. Perfect companion for NCERT whenever you need deeper clinical context.",
    tags: ["Comprehensive", "Must Read"],
    createdAt: "2026-09-25T11:20:00.000Z",
    verifiedReader: true,
    helpfulCount: 15
  },
  {
    id: "rev-cs-1",
    bookId: "cs-1",
    bookTitle: "Computer Science with Python",
    userId: "student-dev",
    userName: "Dev Malhotra",
    userRole: "student",
    rating: 5,
    reviewText: "Best introduction to OOP and recursion with Python. Code snippets are well commented and test questions mirror board question patterns.",
    tags: ["Easy to Understand", "Exam Essential"],
    createdAt: "2026-09-28T18:40:00.000Z",
    verifiedReader: true,
    helpfulCount: 28
  }
];

const LOCAL_STORAGE_KEY = "astryn_library_book_reviews";

export function getLocalBookReviews(): BookReview[] {
  if (typeof window === "undefined") return BASELINE_REVIEWS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BASELINE_REVIEWS));
      return BASELINE_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BASELINE_REVIEWS));
      return BASELINE_REVIEWS;
    }
    return parsed;
  } catch {
    return BASELINE_REVIEWS;
  }
}

export function saveLocalBookReview(review: BookReview): BookReview[] {
  if (typeof window === "undefined") return [review];
  try {
    const current = getLocalBookReviews();
    // Check if user already reviewed this book, if so update it
    const existingIndex = current.findIndex(
      (r) => r.bookId === review.bookId && r.userId === review.userId
    );
    let updated: BookReview[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...review, id: updated[existingIndex].id };
    } else {
      updated = [review, ...current];
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save review to localStorage", e);
    return [review];
  }
}

export function deleteLocalBookReview(reviewId: string): BookReview[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getLocalBookReviews();
    const updated = current.filter((r) => r.id !== reviewId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getBookReviews(bookId: string, allReviews: BookReview[]): BookReview[] {
  return allReviews.filter((r) => r.bookId === bookId);
}

export interface RatingStats {
  average: number;
  totalReviews: number;
  distribution: { [stars: number]: number };
}

export function calculateRatingStats(bookId: string, allReviews: BookReview[], defaultRating = 4.8): RatingStats {
  const reviews = getBookReviews(bookId, allReviews);
  if (reviews.length === 0) {
    return {
      average: defaultRating,
      totalReviews: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const distribution: { [stars: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  for (const r of reviews) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[star] = (distribution[star] || 0) + 1;
    sum += r.rating;
  }

  const average = Number((sum / reviews.length).toFixed(1));
  return {
    average,
    totalReviews: reviews.length,
    distribution
  };
}

// Sync review to Firebase Firestore
export async function syncReviewToFirestore(review: BookReview): Promise<void> {
  try {
    if (!db) return;
    await addDoc(collection(db, "book_reviews"), {
      bookId: review.bookId,
      bookTitle: review.bookTitle,
      userId: review.userId,
      userName: review.userName,
      userRole: review.userRole || "student",
      rating: review.rating,
      reviewText: review.reviewText,
      tags: review.tags || [],
      createdAt: review.createdAt,
      verifiedReader: review.verifiedReader || true,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    // Graceful offline fallback - already stored in localStorage
    console.warn("Could not sync review to Firestore (offline or unauthenticated):", err);
  }
}

// Fetch all reviews from Firestore if available
export async function fetchFirestoreReviews(): Promise<BookReview[]> {
  try {
    if (!db) return getLocalBookReviews();
    const reviewsRef = collection(db, "book_reviews");
    const q = query(reviewsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return getLocalBookReviews();
    }
    const firestoreReviews: BookReview[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      firestoreReviews.push({
        id: doc.id,
        bookId: data.bookId,
        bookTitle: data.bookTitle,
        userId: data.userId,
        userName: data.userName,
        userRole: data.userRole,
        rating: data.rating,
        reviewText: data.reviewText,
        tags: data.tags || [],
        createdAt: data.createdAt || new Date().toISOString(),
        verifiedReader: data.verifiedReader ?? true,
        helpfulCount: data.helpfulCount ?? 0
      });
    });

    // Merge with local reviews (avoid duplicates)
    const local = getLocalBookReviews();
    const mergedMap = new Map<string, BookReview>();
    local.forEach((r) => mergedMap.set(`${r.bookId}-${r.userId}`, r));
    firestoreReviews.forEach((r) => mergedMap.set(`${r.bookId}-${r.userId}`, r));
    const merged = Array.from(mergedMap.values());
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return getLocalBookReviews();
  }
}
