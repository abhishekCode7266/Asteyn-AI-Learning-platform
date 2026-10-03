"use client";

import React, { useState } from "react";
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Play, 
  Send, 
  MessageCircle, 
  Globe, 
  ExternalLink,
  Youtube
} from "lucide-react";
import { EducationalVideo } from "@/lib/video-recommendations";

interface ShareVideoModalProps {
  video: EducationalVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareVideoModal({
  video,
  isOpen,
  onClose
}: ShareVideoModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isYoutubeCopied, setIsYoutubeCopied] = useState(false);

  if (!isOpen || !video) return null;

  const getVideoShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/student/videos?videoId=${encodeURIComponent(video.id)}`;
    }
    return `https://astryn.edu/student/videos?videoId=${encodeURIComponent(video.id)}`;
  };

  const getDirectYoutubeUrl = () => {
    return `https://www.youtube.com/watch?v=${video.id}`;
  };

  const shareUrl = getVideoShareUrl();
  const youtubeUrl = getDirectYoutubeUrl();
  const shareText = `Watch "${video.title}" by ${video.channel} on Astryn Educational Video Hub:`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }).catch(() => {
        setIsCopied(true);
      });
    }
  };

  const handleCopyYoutubeLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(youtubeUrl).then(() => {
        setIsYoutubeCopied(true);
        setTimeout(() => setIsYoutubeCopied(false), 2500);
      }).catch(() => {
        setIsYoutubeCopied(true);
      });
    }
  };

  const handleSocialShare = async (platform: "whatsapp" | "telegram" | "twitter" | "native") => {
    if (platform === "native" && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: `${shareText}\n${video.summary.slice(0, 140)}...`,
          url: shareUrl
        });
        return;
      } catch {
        // Fallback or user canceled
      }
    }

    let targetLink = "";
    if (platform === "whatsapp") {
      targetLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    } else if (platform === "telegram") {
      targetLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    } else if (platform === "twitter") {
      targetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    }

    if (targetLink && typeof window !== "undefined") {
      window.open(targetLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-2xs">
              <Share2 size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Share Video Lecture
              </h3>
              <p className="text-[11px] text-slate-500">
                Send to classmates, study groups, or social channels
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Card Brief */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Play size={20} className="fill-white translate-x-0.5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black uppercase text-red-600 block truncate">
              {video.channel} • {video.duration}
            </span>
            <h4 className="font-bold text-xs text-slate-900 truncate">
              {video.title}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">
              {video.category} ({video.rating} ★)
            </p>
          </div>
        </div>

        {/* Direct Link Copy Field (Astryn Hub) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
            <span>Direct Video Lecture Link:</span>
            {isCopied && <span className="text-emerald-600 font-bold text-[10px] animate-pulse">Copied to clipboard!</span>}
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                isCopied 
                  ? "bg-emerald-600 text-white" 
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Direct YouTube Link Copy */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Youtube size={12} className="text-red-600" />
              <span>Direct YouTube Link:</span>
            </span>
            {isYoutubeCopied && <span className="text-emerald-600 font-bold text-[10px]">Copied!</span>}
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              readOnly
              value={youtubeUrl}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-mono select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyYoutubeLink}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isYoutubeCopied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{isYoutubeCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Social Sharing Options: WhatsApp, Telegram, Twitter */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <label className="text-[11px] font-bold text-slate-600 block">
            Instant Social Share:
          </label>
          <div className="grid grid-cols-3 gap-2">
            
            {/* WhatsApp */}
            <button
              type="button"
              onClick={() => handleSocialShare("whatsapp")}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle size={15} className="text-emerald-600 fill-emerald-100" />
              <span>WhatsApp</span>
            </button>

            {/* Telegram */}
            <button
              type="button"
              onClick={() => handleSocialShare("telegram")}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Send size={15} className="text-sky-600 fill-sky-100" />
              <span>Telegram</span>
            </button>

            {/* Twitter / X */}
            <button
              type="button"
              onClick={() => handleSocialShare("twitter")}
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Globe size={15} />
              <span>Twitter (X)</span>
            </button>
          </div>

          {/* Device App Menu Native Share (Mobile / Tablet) */}
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              type="button"
              onClick={() => handleSocialShare("native")}
              className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-300 shadow-2xs"
            >
              <Share2 size={14} />
              <span>Share via Device App Menu</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
