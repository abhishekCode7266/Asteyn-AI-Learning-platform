"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Camera, Shield, Bell, Save, Building } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeacherSettings() {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [school, setSchool] = useState("Astryn Academy");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call for saving profile
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile & Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your educator account, school details, and notifications.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Profile Picture Section */}
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-6 bg-slate-50/50">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center text-indigo-600">
              <User size={40} />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-slate-200 shadow-sm text-slate-600 hover:text-indigo-600 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900">{user?.name || "Teacher"}</h2>
            <p className="text-sm text-slate-500">Educator Account</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-8">
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User size={18} className="text-indigo-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5 border outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5 border outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building size={18} className="text-indigo-500" />
                Institution Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">School / Organization Name</label>
                  <input 
                    type="text" 
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5 border outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell size={18} className="text-indigo-500" />
                Notifications & Alerts
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Classroom Insights</p>
                    <p className="text-xs text-slate-500">Weekly reports on student performance and weak concepts.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-600" />
                </label>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                Password & Security
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
                    className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5 border outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5 border outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {showSuccess ? (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-600 font-semibold text-sm flex items-center gap-2"
                >
                  <Shield size={16} /> Changes saved successfully
                </motion.span>
              ) : (
                <span></span>
              )}
              <button 
                type="submit" 
                disabled={isSaving}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
