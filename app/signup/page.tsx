"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(result.error ?? "We could not create your account.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(73,104,255,0.14),_transparent_22%),_#f9f8f4] px-4 py-8">
      <div className="liquid-panel w-full max-w-md rounded-[30px] p-6 sm:p-8">
        <div className="mb-6 text-center">
          <p className="genz-kicker justify-center">Join the campus</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#172033]">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-[#596477]">Find help, find work, and meet students who get your deadline energy.</p>
        </div>

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="text-lg font-bold text-emerald-900">Welcome aboard ✦</p>
            <p className="mt-2 text-sm leading-6 text-emerald-800">Your account was created. Taking you to your dashboard…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-xs font-bold uppercase tracking-[0.15em] text-[#596477]">Username</label>
              <input id="username" name="username" required minLength={3} placeholder="yourcampusname" className="mt-2 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#172033] outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.15em] text-[#596477]">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@college.edu" className="mt-2 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#172033] outline-none" />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.15em] text-[#596477]">Password</label>
              <input id="password" name="password" type="password" required minLength={8} placeholder="At least 8 characters" className="mt-2 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#172033] outline-none" />
            </div>
            <div>
              <label htmlFor="college" className="text-xs font-bold uppercase tracking-[0.15em] text-[#596477]">College <span className="font-medium normal-case tracking-normal">(optional)</span></label>
              <input id="college" name="college" placeholder="Your college name" className="mt-2 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#172033] outline-none" />
            </div>

            {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-medium text-red-700">{error}</p>}

            <button disabled={loading} className="genz-button w-full px-4 py-3 text-sm font-black disabled:cursor-wait disabled:opacity-60">
              {loading ? "Creating your account..." : "Create account ↗"}
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-[#596477]">Already here? <Link href="/login" className="font-bold text-[#172033]">Log in</Link></p>
      </div>
    </div>
  );
}