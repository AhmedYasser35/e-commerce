"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import Link from "next/link";

export default function Login() {
  const searchParams = useSearchParams();
  const pathname = searchParams.get("callback-url");
  const [isLoading, setisLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function submitForm(values: zod.infer<typeof loginSchema>) {
    setisLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: pathname ?? "/",
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Welcome back! 👋");
      window.location.href = response.url || "/";
    } else {
      toast.error("Invalid Email or password");
    }
    setisLoading(false);
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 bg-gray-50/50">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-2xl mb-4 transform rotate-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
            Login<span className="text-green-600">.</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Welcome back to your account
          </p>
        </div>

        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
          {/* Email Field */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  placeholder="name@example.com"
                  className={`h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all ring-offset-transparent ${fieldState.invalid ? "border-red-500" : ""}`}
                />
                {fieldState.invalid && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgotPassword"
                    title="Reset your password"
                    className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className={`h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all ring-offset-transparent ${fieldState.invalid ? "border-red-500" : ""}`}
                />
                {fieldState.invalid && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg shadow-green-200 transition-all active:scale-[0.98] mt-4"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-400 font-medium">
              New here?{" "}
              <Link
                href="/register"
                className="font-black text-gray-900 hover:text-green-600 transition-colors underline decoration-green-500/30 underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
