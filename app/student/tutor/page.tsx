"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Globe, Sparkles, Play, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LockedFeature from '@/components/LockedFeature';
import EducationalVideoPlayerModal from '@/components/EducationalVideoPlayerModal';
import { EducationalVideo, searchEducationalVideos } from '@/lib/video-recommendations';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function AITutorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your Astryn AI Tutor. I noticed you've been working on Algebra recently. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connected Video Player Modal State
  const [activeVideo, setActiveVideo] = useState<EducationalVideo | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (user && !user.hasPaid) {
    return <LockedFeature featureName="AI Tutor" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting right now. Please check if we are in offline mode." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Astryn AI Tutor
              <span className="flex items-center gap-1 rounded-full bg-slate-200/50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                <Sparkles size={10} className="text-indigo-500" />
                Powered by Gemini
              </span>
            </h2>
            <p className="text-xs text-slate-500">Multilingual Step-by-Step Helper</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm">
          <Globe size={16} />
          <select className="bg-transparent outline-none font-medium text-slate-700 cursor-pointer">
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none space-y-2.5'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>

              {msg.role === 'assistant' && msg.id !== '1' && (
                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Concept Video Lecture:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const vids = searchEducationalVideos(msg.content.slice(0, 80));
                      if (vids.length > 0) {
                        setActiveVideo(vids[0]);
                        setIsVideoModalOpen(true);
                      }
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 bg-white hover:bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Play size={11} className="fill-red-600 text-red-600" />
                    <span>Watch Connected Video</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
              <Bot size={16} />
            </div>
            <div className="max-w-[80%] rounded-2xl bg-slate-100 px-5 py-4 rounded-tl-none flex items-center">
              <Loader2 size={16} className="animate-spin text-slate-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question... (e.g. Can you explain linear equations?)"
            className="flex-1 rounded-xl border-0 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Embedded Educational Video Player Modal */}
      <EducationalVideoPlayerModal
        video={activeVideo}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setActiveVideo(null);
        }}
      />
    </div>
  );
}
