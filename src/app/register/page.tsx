"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { schema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function submitForm(values: zod.infer<typeof schema>) {
    setisLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        },
      );
      if (response.ok) {
        toast.success("Account created successfully! 🎉");
        router.push("/login");
      } else {
        toast.error("Email already exists or invalid data");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50/50">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
            Create Account <span className="text-green-600">.</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Join us today! Please enter your details to register.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    className={`h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <p className="text-xs text-red-500 ml-1 mt-1">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="010XXXXXXXX"
                    className={`h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <p className="text-xs text-red-500 ml-1 mt-1">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="name@example.com"
                  className={`h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all ${fieldState.invalid ? "border-red-500" : ""}`}
                />
                {fieldState.invalid && (
                  <p className="text-xs text-red-500 ml-1 mt-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className={`h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <p className="text-xs text-red-500 ml-1 mt-1">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Re-Password */}
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className={`h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <p className="text-xs text-red-500 ml-1 mt-1">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="mt-8 w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg shadow-green-200 transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-green-600 hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
