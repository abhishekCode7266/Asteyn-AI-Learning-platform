"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const DEVELOPER_EMAIL = 'abhisheksoraon9@gmail.com';
export const MASTER_BYPASS_CODES = ['ABHISHEK2026', 'DEV2026', 'ASTRYN2026', 'abhisheksoraon9@gmail.com', 'bypass2026'];

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  hasPaid: boolean;
  isDeveloper?: boolean;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string; // ISO string
  daysRemaining?: number;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role: 'student' | 'teacher', hasPaid: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  developerBypass: (role?: 'student' | 'teacher', isPaid?: boolean, customEmail?: string) => void;
  applyBypassCode: (code: string) => boolean;
  grantFreeAccessEmail: (email: string) => void;
  revokeFreeAccessEmail: (email: string) => void;
  getFreeAccessEmails: () => string[];
  activateSubscription: (planId: string, durationMonths: number) => void;
  extendSubscription: (durationMonths: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Helper to calculate days remaining until expiry
  const calculateDaysRemaining = (expiresAtStr?: string): number => {
    if (!expiresAtStr) return 0;
    const expiry = new Date(expiresAtStr).getTime();
    const now = Date.now();
    const diff = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  // Helper to check if email is granted free VIP bypass
  const checkEmailHasFreeAccess = (email?: string | null): boolean => {
    if (!email) return false;
    const lower = email.toLowerCase().trim();
    if (lower === DEVELOPER_EMAIL.toLowerCase()) return true;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('free_access_emails');
        if (stored) {
          const list: string[] = JSON.parse(stored);
          return list.some(e => e.toLowerCase().trim() === lower);
        }
      } catch (err) {
        console.error("Error reading free access emails:", err);
      }
    }
    return false;
  };

  useEffect(() => {
    const isDevBypass = typeof window !== 'undefined' ? localStorage.getItem('dev_bypass') === 'true' : false;
    const isTeacherBypass = typeof window !== 'undefined' ? localStorage.getItem('teacher_bypass') === 'true' : false;
    const isDevPaidBypass = typeof window !== 'undefined' ? localStorage.getItem('dev_paid_bypass') === 'true' : false;
    const bypassCustomEmail = typeof window !== 'undefined' ? localStorage.getItem('dev_bypass_email') : null;
    const storedSubscription = typeof window !== 'undefined' ? localStorage.getItem('astryn_subscription') : null;

    let subData: { plan?: string; expiresAt?: string } = {};
    if (storedSubscription) {
      try {
        subData = JSON.parse(storedSubscription);
      } catch (e) {
        console.error(e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (isDevBypass) {
        const email = bypassCustomEmail || DEVELOPER_EMAIL;
        const isDev = email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        setUser({
          id: 'dev-abhishek-bypass',
          name: isDev ? 'Abhishek (Developer & Admin)' : 'VIP Student (Free Access)',
          email,
          role: 'student',
          hasPaid: true,
          isDeveloper: isDev,
          subscriptionPlan: 'Lifetime Developer Pass',
          subscriptionExpiresAt: expiresAt,
          daysRemaining: 365,
        });
        setIsLoading(false);
        return;
      }

      if (isTeacherBypass) {
        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        setUser({
          id: 'dev-teacher-123',
          name: 'Dev Teacher / Instructor',
          email: 'teacher@astryn.demo',
          role: 'teacher',
          hasPaid: true,
          isDeveloper: true,
          subscriptionPlan: 'Educator Master Plan',
          subscriptionExpiresAt: expiresAt,
          daysRemaining: 365,
        });
        setIsLoading(false);
        return;
      }

      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          const isDev = (firebaseUser.email || '').toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
          const hasVipFree = checkEmailHasFreeAccess(firebaseUser.email);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const expiresAt = data.subscriptionExpiresAt || subData.expiresAt;
            const daysRemaining = calculateDaysRemaining(expiresAt);
            const isSubActive = isDev || hasVipFree || (daysRemaining > 0) || Boolean(data.hasPaid);

            setUser({
              id: firebaseUser.uid,
              name: data.name || (isDev ? 'Abhishek (Developer)' : 'Student'),
              email: data.email || firebaseUser.email || '',
              role: data.role || 'student',
              hasPaid: isSubActive,
              isDeveloper: isDev,
              subscriptionPlan: data.subscriptionPlan || subData.plan || (isDev ? "Developer VIP" : "Pro Plan"),
              subscriptionExpiresAt: expiresAt,
              daysRemaining: isDev || hasVipFree ? 365 : daysRemaining,
            });
          } else {
            const expiresAt = subData.expiresAt || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
            setUser({
              id: firebaseUser.uid,
              name: isDev ? 'Abhishek (Developer & Admin)' : (firebaseUser.displayName || 'Astryn Learner'),
              email: firebaseUser.email || '',
              role: 'student',
              hasPaid: isDev || hasVipFree,
              isDeveloper: isDev,
              subscriptionPlan: subData.plan || "Free Trial",
              subscriptionExpiresAt: expiresAt,
              daysRemaining: calculateDaysRemaining(expiresAt),
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          const isDev = (firebaseUser.email || '').toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
          const hasVipFree = checkEmailHasFreeAccess(firebaseUser.email);
          setUser({
            id: firebaseUser.uid,
            name: isDev ? 'Abhishek (Developer)' : 'Astryn User',
            email: firebaseUser.email || '',
            role: 'student',
            hasPaid: isDev || hasVipFree,
            isDeveloper: isDev,
            subscriptionPlan: "Standard Access",
            daysRemaining: 30,
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Activate or update subscription
  const activateSubscription = (planId: string, durationMonths: number) => {
    const durationDays = durationMonths * 30;
    const now = Date.now();
    const currentExpiry = user?.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt).getTime() : now;
    const baseTime = currentExpiry > now ? currentExpiry : now;
    const newExpiresAt = new Date(baseTime + durationDays * 24 * 60 * 60 * 1000).toISOString();

    const planName = durationMonths === 1 ? "1 Month Pro" : durationMonths === 3 ? "3 Months Semester" : "6 Months Master Pro";

    if (typeof window !== 'undefined') {
      localStorage.setItem('astryn_subscription', JSON.stringify({
        plan: planName,
        expiresAt: newExpiresAt
      }));
      localStorage.setItem('dev_paid_bypass', 'true');
    }

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        hasPaid: true,
        subscriptionPlan: planName,
        subscriptionExpiresAt: newExpiresAt,
        daysRemaining: calculateDaysRemaining(newExpiresAt),
      };
    });

    // Also update Firestore if user exists
    if (user?.id && !user.id.startsWith("dev-")) {
      try {
        setDoc(doc(db, 'users', user.id), {
          hasPaid: true,
          subscriptionPlan: planName,
          subscriptionExpiresAt: newExpiresAt,
        }, { merge: true });
      } catch (err) {
        console.error("Failed to update user subscription in DB:", err);
      }
    }
  };

  const extendSubscription = (durationMonths: number) => {
    activateSubscription(user?.subscriptionPlan || "Pro Extension", durationMonths);
  };

  const login = async (email: string, pass: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const uid = userCredential.user.uid;
    const isDev = email.toLowerCase().trim() === DEVELOPER_EMAIL.toLowerCase();
    const hasVipFree = checkEmailHasFreeAccess(email);

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        router.push(`/${data.role || 'student'}`);
      } else {
        await setDoc(doc(db, 'users', uid), {
          name: isDev ? 'Abhishek (Developer)' : 'Learner',
          email,
          role: 'student',
          hasPaid: isDev || hasVipFree,
        });
        router.push('/student');
      }
    } catch {
      router.push('/student');
    }
  };

  const register = async (name: string, email: string, pass: string, role: 'student' | 'teacher', hasPaid: boolean) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCredential.user.uid;
    const isDev = email.toLowerCase().trim() === DEVELOPER_EMAIL.toLowerCase();
    const hasVipFree = checkEmailHasFreeAccess(email);
    
    const finalHasPaid = isDev || hasVipFree || hasPaid;
    const expiresAt = new Date(Date.now() + (finalHasPaid ? 90 : 7) * 24 * 60 * 60 * 1000).toISOString();

    await setDoc(doc(db, 'users', uid), {
      name,
      email,
      role,
      hasPaid: finalHasPaid,
      subscriptionPlan: finalHasPaid ? "3 Months Pro" : "7-Day Free Trial",
      subscriptionExpiresAt: expiresAt,
    });

    router.push(`/${role}`);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_bypass');
      localStorage.removeItem('teacher_bypass');
      localStorage.removeItem('dev_paid_bypass');
      localStorage.removeItem('dev_bypass_email');
    }
    await firebaseSignOut(auth);
    setUser(null);
    router.push('/login');
  };

  const developerBypass = (role: 'student' | 'teacher' = 'student', isPaid: boolean = true, customEmail?: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_bypass');
      localStorage.removeItem('teacher_bypass');
      localStorage.removeItem('dev_paid_bypass');
      localStorage.removeItem('dev_bypass_email');

      if (role === 'teacher') {
        localStorage.setItem('teacher_bypass', 'true');
      } else {
        localStorage.setItem('dev_bypass', 'true');
        if (isPaid) {
          localStorage.setItem('dev_paid_bypass', 'true');
        }
        if (customEmail) {
          localStorage.setItem('dev_bypass_email', customEmail);
        }
      }
      localStorage.setItem('is_developer', 'true');
    }

    const email = customEmail || DEVELOPER_EMAIL;
    const isDev = email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

    setUser({
      id: 'dev-abhishek-bypass',
      name: isDev ? 'Abhishek (Developer & Admin)' : 'VIP Student (Free Access)',
      email,
      role,
      hasPaid: isPaid || isDev,
      isDeveloper: isDev,
      subscriptionPlan: "Lifetime Developer Pass",
      subscriptionExpiresAt: expiresAt,
      daysRemaining: 365,
    });

    router.push(`/${role}`);
  };

  const applyBypassCode = (code: string): boolean => {
    const clean = code.trim().toLowerCase();
    const isMatch = MASTER_BYPASS_CODES.some(c => c.toLowerCase() === clean);
    if (isMatch) {
      developerBypass('student', true, DEVELOPER_EMAIL);
      return true;
    }
    if (clean.includes('@') && checkEmailHasFreeAccess(clean)) {
      developerBypass('student', true, clean);
      return true;
    }
    return false;
  };

  const grantFreeAccessEmail = (newEmail: string) => {
    if (typeof window === 'undefined') return;
    const clean = newEmail.toLowerCase().trim();
    if (!clean || !clean.includes('@')) return;

    try {
      const stored = localStorage.getItem('free_access_emails');
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.some(e => e.toLowerCase() === clean)) {
        list.push(clean);
        localStorage.setItem('free_access_emails', JSON.stringify(list));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const revokeFreeAccessEmail = (oldEmail: string) => {
    if (typeof window === 'undefined') return;
    const clean = oldEmail.toLowerCase().trim();
    try {
      const stored = localStorage.getItem('free_access_emails');
      if (stored) {
        const list: string[] = JSON.parse(stored);
        const filtered = list.filter(e => e.toLowerCase() !== clean);
        localStorage.setItem('free_access_emails', JSON.stringify(filtered));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getFreeAccessEmails = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('free_access_emails');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      developerBypass,
      applyBypassCode,
      grantFreeAccessEmail,
      revokeFreeAccessEmail,
      getFreeAccessEmails,
      activateSubscription,
      extendSubscription,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
