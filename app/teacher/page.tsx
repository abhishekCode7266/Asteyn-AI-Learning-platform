"use client";

import { useState, useEffect } from 'react';
import { MOCK_CLASS_ANALYTICS, MOCK_USER } from '@/lib/mock-data';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Check, 
  X, 
  Upload, 
  PlusCircle, 
  Calendar, 
  ShieldCheck, 
  RefreshCw,
  Sparkles,
  FileText,
  Video,
  Layers
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import AutoLearningFeed from '@/components/AutoLearningFeed';

interface TeacherCourse {
  id: string;
  title: string;
  subject: string;
  grade: string;
  chaptersCount: number;
  enrolledStudents: number;
  description: string;
}

const DEFAULT_COURSES: TeacherCourse[] = [
  {
    id: "c-1",
    title: "Class 10 CBSE Math: Mastery of Quadratic & Coordinate Geometry",
    subject: "Mathematics & Logic",
    grade: "Class 10",
    chaptersCount: 8,
    enrolledStudents: 48,
    description: "Detailed step-by-step video problem solving and NCERT exemplar walkthroughs."
  },
  {
    id: "c-2",
    title: "Foundations of Physical Chemistry: Thermodynamics & Kinetics",
    subject: "Chemistry & Materials",
    grade: "Class 11-12",
    chaptersCount: 12,
    enrolledStudents: 36,
    description: "Formula derivation sheets, numerical shortcuts, and previous year JEE/NEET questions."
  }
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Teacher Course Creation Modal & State
  const [courses, setCourses] = useState<TeacherCourse[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("astryn_teacher_courses");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_COURSES;
  });

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseSubject, setNewCourseSubject] = useState("Mathematics & Logic");
  const [newCourseGrade, setNewCourseGrade] = useState("Class 10");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCourseChapters, setNewCourseChapters] = useState("");
  const [courseSuccessMsg, setCourseSuccessMsg] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // Check bypass first
    const isTeacherBypass = typeof window !== 'undefined' ? localStorage.getItem('teacher_bypass') === 'true' : false;
    if (isTeacherBypass) {
      setPendingPayments([
        {
          id: 'mock-1',
          userId: 'mock-u1',
          userName: 'Rahul Sharma (PhonePe)',
          status: 'pending',
          utrNumber: 'PHONEPE427189034',
          amount: 299,
          planName: '3 Months Semester Pass'
        }
      ]);
      return;
    }

    // Listen for real pending payments
    const q = query(collection(db, "payment_requests"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const payments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingPayments(payments);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newCourse: TeacherCourse = {
      id: `course-${Date.now()}`,
      title: newCourseTitle.trim(),
      subject: newCourseSubject,
      grade: newCourseGrade,
      chaptersCount: newCourseChapters.split("\n").filter(c => c.trim()).length || 4,
      enrolledStudents: 1,
      description: newCourseDescription.trim() || "Comprehensive interactive learning module published for Astryn students.",
    };

    const updated = [newCourse, ...courses];
    setCourses(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("astryn_teacher_courses", JSON.stringify(updated));
    }

    setNewCourseTitle("");
    setNewCourseDescription("");
    setNewCourseChapters("");
    setCourseSuccessMsg("New Course Published successfully to Astryn Learning Platform!");
    setTimeout(() => {
      setCourseSuccessMsg("");
      setIsCourseModalOpen(false);
    }, 1500);
  };

  const handleApprove = async (paymentId: string, userId: string) => {
    const isTeacherBypass = typeof window !== 'undefined' ? localStorage.getItem('teacher_bypass') === 'true' : false;
    if (isTeacherBypass) {
      setPendingPayments(prev => prev.filter(p => p.id !== paymentId));
      alert("Payment verified! Student has been granted Pro Access.");
      return;
    }

    try {
      await updateDoc(doc(db, "payment_requests", paymentId), {
        status: "approved"
      });
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          hasPaid: true
        });
      }
      alert("Payment verified! Student subscription active.");
    } catch (err) {
      console.error("Error approving payment:", err);
      alert("Failed to approve payment.");
    }
  };

  const handleReject = async (paymentId: string) => {
    const isTeacherBypass = typeof window !== 'undefined' ? localStorage.getItem('teacher_bypass') === 'true' : false;
    if (isTeacherBypass) {
      setPendingPayments(prev => prev.filter(p => p.id !== paymentId));
      alert("Payment rejected.");
      return;
    }

    try {
      await updateDoc(doc(db, "payment_requests", paymentId), {
        status: "rejected"
      });
      alert("Payment rejected.");
    } catch (err) {
      console.error("Error rejecting payment:", err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Teacher Top Header & Subscription Status */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, {user?.name || MOCK_USER.teacher.name.split(' ')[0]}
            </h1>
            <span className="bg-purple-100 text-[#5f259f] border border-purple-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck size={13} />
              <span>Educator Pro</span>
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Publish courses, upload study books, review AI performance, and verify student PhonePe payments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user?.subscriptionExpiresAt && (
            <div className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 font-medium">
              <Calendar size={14} className="text-[#5f259f]" />
              <span>Valid till: <b>{new Date(user.subscriptionExpiresAt).toLocaleDateString()}</b> ({user.daysRemaining || 30} days left)</span>
            </div>
          )}

          <Link
            href="/student/upgrade"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw size={13} />
            <span>Extend Validity (तारीख बढ़ाएं)</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsCourseModalOpen(true)}
            className="bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <PlusCircle size={15} />
            <span>Create &amp; Upload Course</span>
          </button>

          <Link
            href="/student/books"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <BookOpen size={15} />
            <span>Upload Books</span>
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Users size={18} className="text-[#5f259f]" />
            <h3 className="text-sm font-medium">Total Students</h3>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{MOCK_CLASS_ANALYTICS.totalStudents}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <TrendingUp size={18} className="text-emerald-600" />
            <h3 className="text-sm font-medium">Avg Class Score</h3>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{MOCK_CLASS_ANALYTICS.averageScore}%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <BookOpen size={18} className="text-indigo-600" />
            <h3 className="text-sm font-medium">Active Courses</h3>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{courses.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-2 text-rose-500">
            <AlertTriangle size={18} />
            <h3 className="text-sm font-medium">Interventions</h3>
          </div>
          <p className="text-3xl font-extrabold text-rose-600">{MOCK_CLASS_ANALYTICS.interventionAlerts.length}</p>
        </div>
      </div>

      {/* Teacher's Uploaded Courses Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5f259f] flex items-center justify-center font-bold">
              <Layers size={18} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Your Published Courses &amp; Modules</h3>
              <p className="text-xs text-slate-500">Students access these courses for their semester and board preparation.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCourseModalOpen(true)}
            className="text-xs font-bold text-[#5f259f] hover:underline flex items-center gap-1"
          >
            <PlusCircle size={14} />
            <span>Add New Course</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="rounded-2xl border border-slate-200 p-4 hover:border-purple-300 transition-all bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-[#5f259f] px-2 py-0.5 rounded">
                    {course.subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{course.grade}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{course.title}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{course.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span>{course.chaptersCount} Chapters • {course.enrolledStudents} Enrolled</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Active Live</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Updated Internet Feed Component */}
      <AutoLearningFeed />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Chart */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-6">Topic Performance Analysis (10th Math)</h2>
            <div className="h-72 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_CLASS_ANALYTICS.performanceByTopic}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="topic" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                    />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}} 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar 
                      dataKey="score" 
                      fill="#5f259f" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Pending PhonePe Payments (Real from Firestore) */}
          <div className="rounded-3xl border border-purple-200 bg-purple-50/40 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5f259f] text-white text-xs font-bold">
                {pendingPayments.length}
              </span>
              <span>Pending PhonePe UTR Approvals</span>
            </h2>
            
            {pendingPayments.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white p-4 rounded-xl border border-purple-100 text-center">
                All PhonePe payments have been verified and processed.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingPayments.map(payment => (
                  <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-purple-100 bg-white p-4 rounded-xl shadow-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{payment.userName || "Student"}</p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-[#5f259f] border border-purple-100">
                          {payment.planName || "Pro Plan"}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-600 mt-1">UTR: <b className="text-slate-900">{payment.utrNumber}</b></p>
                      <p className="text-xs text-slate-500 mt-0.5">Amount: ₹{payment.amount || 299} • Duration: {payment.durationMonths || 3} Months</p>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button 
                        onClick={() => handleReject(payment.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1"
                      >
                        <X size={14} /> Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(payment.id, payment.userId)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#5f259f] rounded-lg hover:bg-[#4a1c7c] transition-colors shadow-sm flex items-center gap-1"
                      >
                        <Check size={14} /> Verify &amp; Activate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-2">Student Interventions</h2>
            <p className="text-xs text-slate-500 mb-4">AI concept gap detection</p>
            <div className="space-y-3">
              {MOCK_CLASS_ANALYTICS.strugglingStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{student.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Weak in: <span className="font-semibold text-rose-600">{student.issue}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-slate-900">{student.score}%</span>
                    <Link href="/student/books" className="block text-[11px] font-bold text-[#5f259f] hover:underline mt-0.5">
                      Suggest Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Upload Action Box */}
          <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5f259f] text-white flex items-center justify-center font-bold">
              <Upload size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Course &amp; Book Studio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educators have full publishing rights to create new class syllabi, upload PDF textbooks, and organize chapters.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(true)}
                className="w-full bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors text-center"
              >
                + Create New Course
              </button>
              <Link
                href="/student/books"
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition-colors text-center"
              >
                Upload Book to Library
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create & Upload Course */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PlusCircle size={20} className="text-[#5f259f]" />
                <h3 className="font-black text-slate-900 text-lg">Create &amp; Publish Course</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {courseSuccessMsg && (
              <div className="my-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                {courseSuccessMsg}
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Trigonometry for Class 10 Board Exams"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#5f259f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject Category
                  </label>
                  <select
                    value={newCourseSubject}
                    onChange={(e) => setNewCourseSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#5f259f]"
                  >
                    <option value="Mathematics & Logic">Mathematics &amp; Logic</option>
                    <option value="Physics & Mechanics">Physics &amp; Mechanics</option>
                    <option value="Chemistry & Materials">Chemistry &amp; Materials</option>
                    <option value="English Literature & Grammar">English Literature</option>
                    <option value="Hindi Sahitya & Vyakaran">Hindi Sahitya</option>
                    <option value="Sanskrit Bhasha & Shlokas">Sanskrit Bhasha</option>
                    <option value="Computer Science & AI">Computer Science &amp; AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Grade / Class
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Class 10 or Graduation"
                    value={newCourseGrade}
                    onChange={(e) => setNewCourseGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#5f259f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Description &amp; Objectives
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide a brief summary of what students will learn..."
                  value={newCourseDescription}
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#5f259f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chapters / Syllabus (1 per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Chapter 1: Introduction&#10;Chapter 2: Core Concepts&#10;Chapter 3: Solved Exemplars&#10;Chapter 4: Practice Quiz"
                  value={newCourseChapters}
                  onChange={(e) => setNewCourseChapters(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#5f259f] font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#5f259f] hover:bg-[#4a1c7c] text-white shadow-sm"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
