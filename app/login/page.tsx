"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) setError(result.error ?? "Login failed.");
    else window.location.href = "/";
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(73,104,255,0.14),_transparent_22%),_#f9f8f4] px-4">
      <form onSubmit={handleSubmit} className="liquid-panel w-full max-w-md rounded-[30px] p-6 sm:p-8">
        <div className="mb-6 text-center">
          <p className="genz-kicker justify-center">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black text-[#172033]">Log in to CampusAid</h1>
          <p className="mt-2 text-sm leading-6 text-[#596477]">Pick up where your campus life left off.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="identifier" className="text-xs font-bold uppercase tracking-[0.15em] text-[#596477]">Username or email</label>
            <input id="identifier" name="identifier" required placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#172033] outline-none" />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.15em] text-[#596477]">Password</label>
            <input id="password" name="password" type="password" required placeholder="Your password" className="mt-2 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#172033] outline-none" />
          </div>
        </div>
        {error && <p role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-medium text-red-700">{error}</p>}
        <button disabled={loading} className="genz-button mt-6 w-full px-4 py-3 text-sm font-black disabled:opacity-60">{loading ? "Logging in..." : "Log in ↗"}</button>
        <p className="mt-5 text-center text-sm text-[#596477]">New here? <Link href="/signup" className="font-bold text-[#172033]">Create account</Link></p>
      </form>
    </div>
  );
}
