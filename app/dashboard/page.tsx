"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";

type TaskBrief = {
  id: string;
  title: string;
  status: string;
  budget: number;
  createdAt: string;
  deadline: string;
  requester: string;
  provider?: string | null;
  role: "posted" | "assigned";
};

const statusBadge: Record<string, string> = {
  OPEN: "bg-sky-100 text-sky-800",
  OFFER_RECEIVED: "bg-amber-100 text-amber-800",
  PAYMENT_PENDING: "bg-orange-100 text-orange-800",
  ACTIVE: "bg-indigo-100 text-indigo-800",
  AWAITING_CONFIRMATION: "bg-violet-100 text-violet-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  DISPUTED: "bg-rose-100 text-rose-800",
  CANCELLED: "bg-zinc-200 text-zinc-700",
};

const ACTIVE_STATUSES = new Set(["OPEN", "OFFER_RECEIVED", "PAYMENT_PENDING", "ACTIVE", "AWAITING_CONFIRMATION"]);
const HISTORY_STATUSES = new Set(["COMPLETED", "DISPUTED", "CANCELLED"]);

function prettyDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return value;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [tasks, setTasks] = useState<TaskBrief[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [me, list] = await Promise.all([
          fetch("/api/auth/me").then((r) => r.json()),
          fetch("/api/tasks").then((r) => r.json().catch(() => [])),
        ]);
        const currentUser = me.user ?? null;
        setUser(currentUser);

        if (currentUser && Array.isArray(list)) {
          const posted = list
            .filter((t: any) => t.requester === currentUser.username)
            .map((t: any) => ({ ...t, role: "posted" as const }));
          const assigned = Array.isArray(list)
            ? list
                .filter((t: any) => t.provider && currentUser.id && t.provider === currentUser.id)
                .map((t: any) => ({ ...t, role: "assigned" as const }))
            : [];
          const all = [...posted, ...assigned].sort(
            (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
          );
          setTasks(all);
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  if (!loaded) {
    return (
      <AppShell>
        <section className="liquid-panel mx-auto max-w-5xl rounded-[30px] p-8">
          <p className="genz-kicker justify-center">Loading…</p>
        </section>
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell>
        <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
          <p className="genz-kicker justify-center">Your space</p>
          <h1 className="mt-3 text-3xl font-black text-[#172033]">Sign in to see your tasks</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">
            Track tasks you posted, offers you sent, and work currently in progress — all in one place.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/login" className="genz-button px-5 py-3 text-sm font-black">Sign in</Link>
            <Link href="/signup" className="rounded-full border-2 border-[#172033] px-5 py-3 text-sm font-black text-[#172033]">Create account</Link>
          </div>
        </section>
      </AppShell>
    );
  }

  const active = tasks.filter((t) => ACTIVE_STATUSES.has(t.status));
  const history = tasks.filter((t) => HISTORY_STATUSES.has(t.status));

  function TaskRow({ task }: { task: TaskBrief }) {
    return (
      <Link
        key={task.id}
        href={`/task/${task.id}`}
        className="glass-panel group flex flex-col justify-between gap-4 rounded-[26px] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:flex-row md:items-center"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`rounded-full px-2.5 py-1 font-bold capitalize ${statusBadge[task.status] ?? "bg-zinc-100 text-zinc-700"}`}>
              {task.status.replace(/_/g, " ").toLowerCase()}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-bold text-zinc-700">
              {task.role === "posted" ? "You posted" : "Assigned to you"}
            </span>
          </div>
          <h3 className="mt-2 truncate text-lg font-bold text-[#172033] group-hover:text-[#4968ff]">{task.title}</h3>
          <p className="mt-1 text-xs text-[#596477]">
            Posted {prettyDate(task.createdAt)} · Deadline {prettyDate(task.deadline)}
          </p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Budget</p>
            <p className="text-xl font-black text-[#172033]">₹{task.budget}</p>
          </div>
          <span className="liquid-action inline-flex h-10 w-10 items-center justify-center rounded-full text-white">→</span>
        </div>
      </Link>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="liquid-panel rounded-[30px] p-6 md:p-8">
          <p className="genz-kicker justify-start">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-[#172033]">Hey {user.username.replace("@", "")}, here's your activity</h1>
          <p className="mt-2 text-sm text-[#596477]">Everything you posted, accepted, or completed on CampusAid.</p>
        </header>

        {tasks.length === 0 ? (
          <section className="liquid-panel rounded-[30px] p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#596477]">No tasks yet</p>
            <h2 className="mt-2 text-2xl font-black text-[#172033]">Get started by posting or browsing</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[#596477]">
              You haven't posted any tasks yet. Post your first task to get help from students in your campus, or browse open work to start earning.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/post-task" className="genz-button px-5 py-3 text-sm font-black">Post a task</Link>
              <Link href="/browse" className="rounded-full border-2 border-[#172033] px-5 py-3 text-sm font-black text-[#172033]">Browse tasks</Link>
            </div>
          </section>
        ) : (
          <>
            <section>
              <div className="mb-3 flex items-end justify-between">
                <h2 className="text-xl font-black text-[#172033]">Active {active.length ? `(${active.length})` : ""}</h2>
                <p className="text-xs text-[#596477]">Work you're currently doing or waiting on.</p>
              </div>
              {active.length === 0 ? (
                <div className="glass-panel rounded-[26px] p-6 text-center text-sm text-[#596477]">
                  No active tasks right now. Anything below is already finished.
                </div>
              ) : (
                <div className="grid gap-4">
                  {active.map((task) => <TaskRow key={task.id} task={task} />)}
                </div>
              )}
            </section>

            <section>
              <div className="mb-3 flex items-end justify-between">
                <h2 className="text-xl font-black text-[#172033]">History {history.length ? `(${history.length})` : ""}</h2>
                <p className="text-xs text-[#596477]">Completed, cancelled, and disputed tasks.</p>
              </div>
              {history.length === 0 ? (
                <div className="glass-panel rounded-[26px] p-6 text-center text-sm text-[#596477]">
                  No finished tasks yet. Once a task is completed or cancelled, it appears here.
                </div>
              ) : (
                <div className="grid gap-4 opacity-95">
                  {history.map((task) => <TaskRow key={task.id} task={task} />)}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
