"use client";

import { useState, Suspense } from "react";
import { AppShell } from "@/components/site-shell";
import { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

function RatingForm() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId") || "";
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const finalTaskId = taskId || (data.get("taskId") as string);
    
    if (!finalTaskId) {
      setMessage("Please provide a task ID");
      return;
    }
    
    const response = await fetch("/api/ratings", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ taskId: finalTaskId, score: rating, review: data.get("review") }) 
    });
    const result = await response.json();
    if (response.ok) {
      setMessage(`Rating saved! New average: ${result.newAverage?.toFixed(1) || 'N/A'}/5`);
      setRating(0);
    } else {
      setMessage(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={submit} className="liquid-panel rounded-[30px] p-6">
        <p className="genz-kicker">Review</p>
        <h1 className="mt-2 text-3xl font-black text-[#172033]">Rate your experience</h1>

        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Completed task ID</label>
          <input 
            name="taskId" 
            defaultValue={taskId}
            placeholder="Paste the completed task ID" 
            className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none" 
          />
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#596477]">How would you rate this completed task?</p>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={value <= rating ? "text-3xl text-amber-500" : "text-3xl text-zinc-300"}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Optional review</label>
          <textarea 
            name="review" 
            className="mt-2 min-h-30 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#596477] outline-none resize-none" 
            placeholder="Share an optional review" 
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button 
            type="button"
            onClick={() => setRating(0)}
            className="rounded-full border border-[#172033] px-5 py-3 text-sm font-black text-[#172033]"
          >
            Clear
          </button>
          <button 
            type="submit"
            disabled={!rating} 
            className="genz-button px-5 py-3 text-sm font-black disabled:opacity-50"
          >
            Submit rating
          </button>
        </div>
        {message && <p className="mt-4 text-sm font-semibold text-emerald-700">{message}</p>}
      </form>
    </div>
  );
}

export default function RatingPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="mx-auto max-w-3xl text-center text-sm text-[#596477]">Loading rating form...</div>}>
        <RatingForm />
      </Suspense>
    </AppShell>
  );
}
