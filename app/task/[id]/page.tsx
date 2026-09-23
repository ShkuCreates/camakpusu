"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

import { AppShell } from "@/components/site-shell";
import { MarketplaceTask } from "@/lib/types";

type TaskWithRatings = MarketplaceTask & {
  ratings?: Array<{
    id: string;
    score: number;
    review: string | null;
    author: { username: string };
    createdAt: string;
  }>;
};

export default function TaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<TaskWithRatings | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/tasks/${id}`).then((response) => response.ok ? response.json() : null),
      fetch("/api/auth/me").then((response) => response.ok ? response.json() : null)
    ]).then(([taskData, userData]) => {
      setTask(taskData);
      setCurrentUser(userData?.user || null);
    }).finally(() => setLoading(false));
  }, [id]);

  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-4xl rounded-[30px] p-8">
        {loading ? (
          <p className="text-center text-sm text-[#596477]">Loading this live task...</p>
        ) : task ? (
          <>
            <p className="genz-kicker">{task.category}</p>
            <h1 className="mt-3 text-4xl font-black text-[#172033]">{task.title}</h1>
            <p className="mt-4 text-base leading-7 text-[#596477]">{task.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/60 p-4"><p className="text-xs font-bold uppercase tracking-widest text-[#596477]">College</p><p className="mt-2 font-bold text-[#172033]">{task.college ?? "Not specified"}</p></div>
              <div className="rounded-2xl bg-white/60 p-4"><p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Locality</p><p className="mt-2 font-bold text-[#172033]">{task.locality}</p></div>
              <div className="rounded-2xl bg-white/60 p-4"><p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Budget</p><p className="mt-2 font-bold text-[#172033]">₹{task.budget}</p></div>
            </div>
            
            {task.status === "COMPLETED" && task.ratings && task.ratings.length > 0 && (
              <div className="mt-8 rounded-2xl bg-white/60 p-6">
                <h3 className="text-lg font-black text-[#172033]">Task Ratings</h3>
                <div className="mt-4 space-y-3">
                  {task.ratings.map((rating) => (
                    <div key={rating.id} className="rounded-xl bg-white/80 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#172033]">{rating.author.username}</p>
                        <p className="text-2xl font-black text-amber-500">{"★".repeat(rating.score)}</p>
                      </div>
                      {rating.review && <p className="mt-2 text-sm text-[#596477]">{rating.review}</p>}
                      <p className="mt-1 text-xs text-[#596477]">{new Date(rating.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {task.status === "COMPLETED" && currentUser && (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                <p className="font-bold">Rate this task</p>
                <p className="mt-1">This task is completed. You can rate the other participant's performance.</p>
                <Link href={`/rating?taskId=${id}`} className="mt-3 inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-black text-white">
                  Rate this task
                </Link>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Sign in to send an offer. Offers and private messaging are only available to authenticated users.</div>
            <Link href="/login" className="mt-5 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Sign in to offer</Link>
          </>
        ) : (
          <div className="text-center"><h1 className="text-3xl font-black text-[#172033]">Task not found</h1><p className="mt-3 text-sm text-[#596477]">This task is not available or has already been removed.</p><Link href="/browse" className="mt-5 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Back to tasks</Link></div>
        )}
      </section>
    </AppShell>
  );
}