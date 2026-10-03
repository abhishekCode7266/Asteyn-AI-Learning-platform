"use client";
import { useState, useEffect } from "react";
import { Settings, Zap, KeyRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DeveloperBypassModal from "./DeveloperBypassModal";

export default function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900/90 hover:bg-slate-900 text-amber-400 p-2.5 rounded-full shadow-2xl border border-slate-700/80 backdrop-blur-xs flex items-center justify-center transition-all hover:scale-110 group"
          title="Master Developer Bypass & Free Access Manager"
          aria-label="Developer Bypass"
        >
          <Zap size={18} className="fill-amber-400 group-hover:animate-bounce" />
        </button>
      </div>

      <DeveloperBypassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
