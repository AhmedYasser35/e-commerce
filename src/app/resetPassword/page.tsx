"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Code from "../_components/code/page";
import Link from "next/link";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function sendCode() {
    if (code) {
      setShowPassword(true);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {!showPassword ? (
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
          <div className="text-center mb-8">
            {/* Shield Icon for Security vibe */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
              Verify Code
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter the 6-digit verification code sent to your email
              address.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Verification Code
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                className="w-full mt-1.5 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-center text-2xl font-black tracking-[0.5em] text-gray-800 placeholder:text-gray-300 placeholder:tracking-normal"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <Button
              onClick={sendCode}
              className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg shadow-green-200 transition-all active:scale-[0.98]"
            >
              Verify & Proceed
            </Button>
          </div>

          <div className="mt-8 text-center flex flex-col gap-3">
            <button className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
              Resend Code
            </button>
            <Link
              href="/login"
              className="text-sm font-bold text-gray-400 hover:text-green-600 transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Code code={code} />
        </div>
      )}
    </div>
  );
}
