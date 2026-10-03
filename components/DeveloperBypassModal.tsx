"use client";

import React, { useState, useEffect } from "react";
import { 
  KeyRound, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  UserPlus, 
  Trash2, 
  X, 
  Smartphone,
  Lock,
  Unlock,
  Check
} from "lucide-react";
import { useAuth, DEVELOPER_EMAIL, MASTER_BYPASS_CODES } from "@/context/AuthContext";

interface DeveloperBypassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperBypassModal({ isOpen, onClose }: DeveloperBypassModalProps) {
  const { 
    user, 
    developerBypass, 
    applyBypassCode, 
    grantFreeAccessEmail, 
    revokeFreeAccessEmail, 
    getFreeAccessEmails,
    logout 
  } = useAuth();

  const [passcode, setPasscode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>(() => {
    try {
      return getFreeAccessEmails();
    } catch {
      return [];
    }
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleInstantBypass = (role: 'student' | 'teacher' = 'student') => {
    developerBypass(role, true, DEVELOPER_EMAIL);
    setMessage({ text: `Activated Developer Full Access as ${DEVELOPER_EMAIL} (${role})!`, type: 'success' });
    setTimeout(onClose, 1500);
  };

  const handleApplyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    const success = applyBypassCode(passcode.trim());
    if (success) {
      setMessage({ text: "Passcode verified! Pro bypass enabled on this device.", type: 'success' });
      setTimeout(onClose, 1500);
    } else {
      setMessage({ text: "Invalid passcode. Try 'ABHISHEK2026' or 'DEV2026'.", type: 'error' });
    }
  };

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setMessage({ text: "Please enter a valid email address.", type: 'error' });
      return;
    }

    grantFreeAccessEmail(newEmail.trim());
    setEmailList(getFreeAccessEmails());
    setNewEmail("");
    setMessage({ text: `Free access granted to ${newEmail}! They can now log in without paying.`, type: 'success' });
  };

  const handleRemoveEmail = (target: string) => {
    revokeFreeAccessEmail(target);
    setEmailList(getFreeAccessEmails());
    setMessage({ text: `Revoked free access for ${target}.`, type: 'success' });
  };

  const handleClearBypass = () => {
    logout();
    setMessage({ text: "All device bypasses cleared. Switched back to guest mode.", type: 'success' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <KeyRound size={18} />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Developer Master Bypass</h3>
              <p className="text-[11px] text-slate-400">Unlock any device without payment &amp; grant free access</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {message && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
              message.type === 'success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
            }`}>
              {message.type === 'success' ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Current Device Status */}
          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Device Status</span>
              <span className="text-xs font-semibold text-white">
                {user ? `${user.name} (${user.role})` : "Guest / Not Logged In"}
              </span>
            </div>
            <div>
              {user?.hasPaid ? (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Unlock size={12} /> Pro Unlocked
                </span>
              ) : (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Lock size={12} /> Standard / Free
                </span>
              )}
            </div>
          </div>

          {/* Option 1: Instant One-Click Developer Bypass */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              1. Instant Developer Bypass (Abhishek)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleInstantBypass('student')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <Zap size={14} className="fill-slate-950" />
                <span>Student Full Pro</span>
              </button>
              <button
                type="button"
                onClick={() => handleInstantBypass('teacher')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <Zap size={14} />
                <span>Teacher Full Portal</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Instantly unlocks all 1-12 classes, question banks (1000-5000 Qs), graduation streams, and 500 game levels on this device.
            </p>
          </div>

          {/* Option 2: Enter Secret Passcode */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Activate via Master Passcode
            </label>
            <form onSubmit={handleApplyPasscode} className="flex gap-2">
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter ABHISHEK2026 or DEV2026"
                className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors"
              >
                Activate
              </button>
            </form>
          </div>

          {/* Option 3: Grant Free Access by Email */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                3. Grant Free Access to User Emails
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {emailList.length} Whitelisted
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Enter any friend or student email. When they log in from any phone or computer, they get full Pro access without paying!
            </p>
            <form onSubmit={handleAddEmail} className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="student@example.com"
                className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <UserPlus size={14} />
                <span>Grant</span>
              </button>
            </form>

            {emailList.length > 0 && (
              <div className="mt-2 max-h-32 overflow-y-auto space-y-1 pr-1">
                {emailList.map((em, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-800/70 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                    <span className="text-slate-200 font-mono">{em}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(em)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="Revoke access"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reset / Clear */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-[11px] text-slate-500">Need to test guest view?</span>
            <button
              type="button"
              onClick={handleClearBypass}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1 rounded-lg hover:bg-rose-950/40 transition-colors"
            >
              Reset to Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
