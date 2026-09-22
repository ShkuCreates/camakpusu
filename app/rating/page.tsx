"use client";

import { useState } from "react";
import { AppShell } from "@/components/site-shell";

export default function RatingPage() {
  const [rating, setRating] = useState(0);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Review</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Rate your experience</h1>

          <div className="mt-6">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-500">How would you rate this completed task?</p>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={value <= rating ? "text-3xl text-amber-500" : "text-3xl text-zinc-300"}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Optional review</label>
            <textarea className="mt-2 min-h-30 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" placeholder="Share an optional review" />
          </div>

          <div className="mt-6 flex justify-end">
            <button className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">Submit rating</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
