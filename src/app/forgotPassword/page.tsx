"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Password from "../_components/password/page";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function sendMail() {
    // Usually, you'd trigger your API call here
    if (email) {
      setShowPassword(true);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {!showPassword ? (
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
          <div className="text-center mb-8">
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
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a3 3 0 0 1-3 3m-3-3a3 3 0 0 1 3-3m2.25 6H21M7.5 15.75l9-9m-9 9a6 6 0 1 1 9-9l-9 9Z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
              Reset Password
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Enter your email and we'll send you a link to get back into your
              account.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full mt-1.5 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-gray-700"
                placeholder="name@company.com"
              />
            </div>

            <Button
              onClick={sendMail}
              className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg shadow-green-200 transition-all active:scale-[0.98]"
            >
              Send Reset Link
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-sm font-bold text-gray-400 hover:text-green-600 transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
          <Password email={email} />
        </div>
      )}
    </div>
  );
}
