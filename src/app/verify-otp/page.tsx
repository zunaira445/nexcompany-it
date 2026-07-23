"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length < 4) {
      toast.error("Please enter the OTP sent to your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.trim(), type: "register" }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Email verified! Welcome aboard.");
        router.push("/");
      } else {
        toast.error(data.message || "Invalid or expired OTP.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) return;
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "register" }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("A new OTP has been sent to your email.");
      } else {
        toast.error(data.message || "Could not resend OTP.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
            <p className="text-gray-400 text-sm">
              We sent a verification code to <span className="text-white">{email || "your email"}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full text-center tracking-[0.5em] text-lg px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                placeholder="------"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Verify Email <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-blue-400 hover:underline font-medium disabled:opacity-60"
            >
              {resending ? "Resending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" />}>
      <VerifyOtpForm />
    </Suspense>
  );
}