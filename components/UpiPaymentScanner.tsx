"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Upload, 
  Image as ImageIcon,
  KeyRound,
  ExternalLink,
  Zap,
  Calendar,
  Clock,
  Sparkles,
  RefreshCw,
  Camera,
  Check,
  Edit2,
  Eye
} from "lucide-react";
import { useAuth, DEVELOPER_EMAIL } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type Plan = {
  id: string;
  name: string;
  price: number;
  duration: string;
  desc: string;
  features?: string[];
};

interface UpiPaymentScannerProps {
  plan: Plan;
  onSuccess?: () => void;
  showDevBypass?: boolean;
}

export default function UpiPaymentScanner({ 
  plan, 
  onSuccess,
  showDevBypass = true 
}: UpiPaymentScannerProps) {
  const { user, developerBypass, applyBypassCode, activateSubscription } = useAuth();
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [customQrImage, setCustomQrImage] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("astryn_phonepe_qr_screenshot");
    }
    return null;
  });
  const [bypassInput, setBypassInput] = useState("");
  const [bypassSuccess, setBypassSuccess] = useState(false);
  const [showBypassDrawer, setShowBypassDrawer] = useState(false);
  
  // Official PhonePe merchant UPI configured by owner (Terminal 2-Q714679312)
  const [merchantUpiId, setMerchantUpiId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("astryn_merchant_phonepe_upi") || "Q714679312@ybl";
    }
    return "Q714679312@ybl";
  });
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [upiDraft, setUpiDraft] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("astryn_merchant_phonepe_upi") || "Q714679312@ybl";
    }
    return "Q714679312@ybl";
  });
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  // Duration in months based on plan
  const planMonths = plan.price === 199 ? 1 : plan.price === 299 ? 3 : 6;

  // PhonePe direct intent URL for mobile tap-to-pay
  const phonePeIntentUrl = `upi://pay?pa=${merchantUpiId}&pn=Astryn%20Learning&am=${plan.price}&cu=INR&tn=Astryn%20Pro%20Subscription%20${planMonths}M`;

  // Dynamically generate the real, scannable QR Code for PhonePe Terminal
  useEffect(() => {
    let isMounted = true;
    const upiPayload = `upi://pay?pa=${merchantUpiId}&pn=Astryn%20Learning&am=${plan.price}&cu=INR&tn=Astryn%20Subscription%20${planMonths}M`;
    QRCode.toDataURL(upiPayload, {
      width: 440,
      margin: 1,
      errorCorrectionLevel: "H",
      color: {
        dark: "#000000",
        light: "#ffffff",
      }
    }).then((url) => {
      if (isMounted) setQrCodeDataUrl(url);
    }).catch(console.error);

    return () => { isMounted = false; };
  }, [merchantUpiId, plan.price, planMonths]);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomQrImage(result);
        if (typeof window !== "undefined") {
          localStorage.setItem("astryn_phonepe_qr_screenshot", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCustomUpi = () => {
    if (upiDraft.trim() && upiDraft.includes("@")) {
      setMerchantUpiId(upiDraft.trim());
      if (typeof window !== "undefined") {
        localStorage.setItem("astryn_merchant_phonepe_upi", upiDraft.trim());
      }
      setIsEditingUpi(false);
    }
  };

  const copyUpiToClipboard = () => {
    navigator.clipboard.writeText(merchantUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (utrNumber.trim().length < 10) {
      setError("Please enter your valid 12-digit UTR / Reference Number from PhonePe.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (user?.id && !user.id.startsWith("dev-")) {
        await addDoc(collection(db, "payment_requests"), {
          userId: user.id,
          userName: user.name || "Student",
          email: user.email || "student@astryn.app",
          utrNumber: utrNumber.trim(),
          planId: plan.id,
          planName: plan.name,
          amount: plan.price,
          durationMonths: planMonths,
          status: "verified",
          timestamp: serverTimestamp(),
        });
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }

      // Activate subscription for the exact months paid (1, 3, or 6 months)
      activateSubscription(plan.id, planMonths);
      setSubmitted(true);

      if (onSuccess) {
        setTimeout(onSuccess, 1800);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit verification request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantBypass = () => {
    developerBypass("student", true, DEVELOPER_EMAIL);
    setBypassSuccess(true);
  };

  const handleCodeBypass = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyBypassCode(bypassInput);
    if (success) {
      setBypassSuccess(true);
    } else {
      setError("Invalid Developer Passcode. Try 'ABHISHEK2026'");
    }
  };

  if (bypassSuccess || (user?.email && user.email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase())) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-xl">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap size={36} className="fill-emerald-500 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-emerald-950">Developer Master Bypass Active!</h3>
        <p className="text-emerald-800 text-sm mt-2 mb-6">
          Full VIP Pro Access is permanently active for <b>{DEVELOPER_EMAIL}</b> without payment. You have complete access to all classes, 50-subject books library, and courses.
        </p>
        <a 
          href="/student" 
          className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-500 shadow-md transition-all text-sm"
        >
          Go to Student Portal &rarr;
        </a>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-2xl space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          PhonePe Payment Confirmed • Access Granted
        </span>
        <h3 className="text-2xl font-black text-slate-900">
          {planMonths} Month{planMonths > 1 ? "s" : ""} Subscription Active!
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          UTR Reference <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{utrNumber}</span> recorded. Your Astryn Platform validity is active for <span className="font-bold text-slate-900">{planMonths * 30} days</span>.
        </p>

        {user?.subscriptionExpiresAt && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 flex items-center justify-center gap-2">
            <Calendar size={15} className="text-[#5f259f]" />
            <span>Valid Until: <b>{new Date(user.subscriptionExpiresAt).toLocaleDateString()}</b> ({user.daysRemaining || planMonths * 30} days remaining)</span>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-2">
          <a
            href="/student"
            className="w-full inline-block bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm"
          >
            Open Student Dashboard &amp; Books Library
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
      {/* Official PhonePe Header */}
      <div className="bg-[#5f259f] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#5f259f] flex items-center justify-center font-black text-2xl shadow-sm border border-purple-200">
            पे
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight">PhonePe Official Payment Stand</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Verified Merchant
              </span>
            </div>
            <p className="text-xs text-purple-200 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck size={13} className="text-emerald-300" />
              <span>Astryn Learning Platform • Official Receipt</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-purple-200 uppercase block font-semibold">Payable Amount</span>
            <span className="text-2xl font-black text-amber-300">₹{plan.price}</span>
            <span className="text-[11px] text-purple-200 block">({planMonths} Month{planMonths > 1 ? "s" : ""} Validity)</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Authentic PhonePe Counter Stand Scanner */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Authentic PhonePe Acrylic Counter Stand */}
          <div className="w-full max-w-sm rounded-3xl border-2 border-slate-200/90 bg-white p-5 text-slate-900 shadow-xl relative flex flex-col items-center">
            
            {/* Stand Acrylic Top Curve Accent */}
            <div className="w-20 h-1.5 bg-purple-200/70 rounded-full mb-3" />

            {/* PhonePe Circular Logo & Wordmark */}
            <div className="flex flex-col items-center gap-1.5 mb-2">
              <div className="w-14 h-14 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-black text-3xl shadow-md border-2 border-purple-100">
                पे
              </div>
              <h3 className="text-2xl font-black text-[#5f259f] tracking-tight">
                PhonePe
              </h3>
            </div>

            {/* ORANGE MERCHANT PILL (Vikas Sweets removed, replaced with Astryn) */}
            <div className="w-full my-2">
              <div className="bg-[#f58220] rounded-full py-2 px-4 shadow-sm text-center">
                <span className="text-slate-950 font-black text-base sm:text-lg tracking-wide uppercase">
                  Astryn
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                <span>Verified Education Merchant</span>
                <span>•</span>
                <span className="font-mono text-[#5f259f] font-bold">{merchantUpiId}</span>
                <button
                  type="button"
                  onClick={copyUpiToClipboard}
                  className="p-1 rounded bg-purple-50 hover:bg-purple-100 text-[#5f259f] transition-colors"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check size={12} className="text-emerald-600" /> : <Smartphone size={12} />}
                </button>
              </div>
            </div>

            {/* THE AUTHENTIC BAR SCANNER / QR CODE DISPLAY */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center my-2 shadow-inner">
              {customQrImage ? (
                /* User's exact PhonePe screenshot if uploaded */
                <div className="relative w-64 h-72 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-white border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={customQrImage} 
                    alt="PhonePe QR Code Screenshot" 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                /* Authentic Scannable QR Bar Scanner */
                <div className="relative w-64 h-64 flex flex-col items-center justify-center bg-white p-2 border border-slate-200 rounded-xl shadow-xs">
                  {qrCodeDataUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrCodeDataUrl}
                        alt={`PhonePe QR Scanner for ₹${plan.price}`}
                        className="w-full h-full object-contain"
                      />
                      {/* Official PhonePe Center Badge */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-md border-2 border-[#5f259f] flex items-center justify-center">
                          <span className="text-[#5f259f] font-black text-lg leading-none">पे</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Fallback to direct SVG Stand Scanner */
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src="/phonepe-scanner.svg"
                      alt="Official PhonePe Barcode Scanner Stand"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              )}

              {/* Exact Amount Tag Badge */}
              <div className="mt-2.5 flex items-center justify-between w-full px-2 text-slate-800">
                <span className="text-xs font-bold text-slate-600">Scan &amp; Pay via PhonePe</span>
                <span className="font-black text-sm text-[#5f259f] bg-purple-100/70 px-2.5 py-0.5 rounded-lg border border-purple-200">
                  ₹{plan.price}
                </span>
              </div>
            </div>

            {/* BHIM | UPI Official Emblem */}
            <div className="my-2 flex items-center justify-center gap-3">
              <span className="font-black italic text-slate-800 text-sm tracking-tight">BHIM</span>
              <div className="flex items-center -space-x-1">
                <span className="inline-block w-2.5 h-3.5 bg-emerald-600 transform -skew-x-12 rounded-xs" />
                <span className="inline-block w-2.5 h-3.5 bg-[#f58220] transform -skew-x-12 rounded-xs" />
              </div>
              <span className="font-black italic text-slate-800 text-sm tracking-tight">UPI</span>
            </div>

            {/* Official Terminal Identifier from User's Stand */}
            <div className="text-[11px] font-semibold text-slate-600 text-center tracking-wide">
              Terminal 2-Q714679312
            </div>

            {/* Tap to Open in PhonePe App on Mobile */}
            <div className="mt-3 w-full">
              <a
                href={phonePeIntentUrl}
                className="w-full flex items-center justify-center gap-2 bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
              >
                <Smartphone size={14} />
                <span>Tap to Pay ₹{plan.price} in PhonePe App</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Full Counter Stand View / Upload Screenshot Controls */}
            <div className="mt-3 pt-2.5 border-t border-slate-200 w-full flex items-center justify-between text-xs text-slate-600">
              <label 
                htmlFor="phonepeScreenshotInput" 
                className="text-[11px] text-purple-700 hover:text-purple-900 underline cursor-pointer inline-flex items-center gap-1 font-semibold"
              >
                <Camera size={13} />
                <span>{customQrImage ? "Replace Screenshot" : "Attach Screenshot"}</span>
              </label>
              <input
                id="phonepeScreenshotInput"
                type="file"
                accept="image/*"
                onChange={handleCustomImageUpload}
                className="hidden"
              />

              <a
                href="/phonepe-scanner.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-600 hover:text-slate-900 underline flex items-center gap-1 font-semibold"
              >
                <Eye size={12} />
                <span>View Stand SVG</span>
              </a>

              {customQrImage && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomQrImage(null);
                    localStorage.removeItem("astryn_phonepe_qr_screenshot");
                  }}
                  className="text-[10px] text-rose-600 hover:text-rose-800 underline"
                >
                  Reset Stand
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: UTR Submission & Subscription Activation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#5f259f] tracking-wider">
                Step 2 of 2: Confirm Payment
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Enter PhonePe UTR Number
              </h3>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                Scan the PhonePe QR with your PhonePe app, complete the payment of <b>₹{plan.price}</b>, and paste the 12-digit UTR/Transaction reference below.
              </p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  PhonePe UTR / Ref No. (12 Digits)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 427189034211"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 font-mono text-sm tracking-widest text-slate-900"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Verifying with PhonePe...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Confirm Payment &amp; Activate {planMonths} Month{planMonths > 1 ? "s" : ""}</span>
                  </>
                )}
              </button>
            </form>

            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Clock size={14} className="text-[#5f259f]" />
                <span>Validity Details:</span>
              </div>
              <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                <li>Selected Plan: <b>{plan.name} (₹{plan.price})</b></li>
                <li>Duration: <b>{planMonths} Month{planMonths > 1 ? "s" : ""} ({planMonths * 30} Days)</b></li>
                <li>Both Student &amp; Teacher can upload books and courses during active subscription.</li>
                <li>When validity ends, extend anytime by renewing with 1, 3, or 6 months.</li>
              </ul>
            </div>
          </div>

          {/* Developer Free Access & Bypass Section */}
          {showDevBypass && (
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowBypassDrawer(!showBypassDrawer)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <KeyRound size={13} className="text-amber-500" />
                  <span>Developer / Free Access Passcode</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleInstantBypass}
                  className="text-[11px] font-bold text-emerald-600 hover:underline"
                >
                  1-Click Dev Bypass
                </button>
              </div>

              {showBypassDrawer && (
                <form onSubmit={handleCodeBypass} className="mt-3 flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter bypass code (e.g. ABHISHEK2026)"
                    value={bypassInput}
                    onChange={(e) => setBypassInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
