"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { localityOptions } from "@/lib/college-data";

type User = { username: string; email: string; college: string | null; locality: string | null; bio: string | null; rating: number; completedTasks: number; role: string; createdAt: string };
type Stats = { postedTasks: number; assignedTasks: number; completedTasks: number; receivedRatings: number };

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [form, setForm] = useState({ college: "", locality: "", bio: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          if (data?.stats) setStats(data.stats);
          setForm({
            college: data.user.college ?? "",
            locality: data.user.locality ?? "",
            bio: data.user.bio ?? "",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  async function save() {
    setMessage("");
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setMessage("Profile saved successfully!");
      const data = await response.json();
      if (data?.user) setUser(data.user);
    } else {
      setMessage("Could not save profile. Please try again.");
    }
  }

  if (loading) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center"><h1 className="text-3xl font-black text-[#172033]">Loading your profile...</h1></section></AppShell>;
  }

  if (!user) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center"><h1 className="text-3xl font-black text-[#172033]">Sign in to view your profile</h1><a href="/login" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Sign in</a></section></AppShell>;
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="liquid-panel rounded-[30px] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="genz-kicker">Your portfolio</p>
              <h1 className="mt-2 text-3xl font-black text-[#172033]">{user.username}</h1>
              <p className="mt-1 text-sm text-[#596477]">{user.email}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d9f85a] text-2xl font-black text-[#172033] shadow-[3px_3px_0_#172033]">
              {user.username.replace("@", "").slice(0, 1).toUpperCase()}
            </div>
          </div>

          {user.bio ? (
            <p className="mt-5 text-sm leading-6 text-[#172033]">{user.bio}</p>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Rating</p>
              <p className="mt-2 text-2xl font-black text-[#172033]">
                {user.rating > 0 ? `${user.rating.toFixed(1)} / 5 ★` : "New on the board"}
              </p>
              <p className="mt-1 text-xs text-[#596477]">{stats?.receivedRatings ?? 0} reviews</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Tasks you posted</p>
              <p className="mt-2 text-2xl font-black text-[#172033]">{stats?.postedTasks ?? 0}</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Work accepted</p>
              <p className="mt-2 text-2xl font-black text-[#172033]">{stats?.assignedTasks ?? 0}</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Completed</p>
              <p className="mt-2 text-2xl font-black text-[#172033]">{stats?.completedTasks ?? user.completedTasks}</p>
              <p className="mt-1 text-xs text-[#596477]">lifetime</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <p className="text-xs text-[#596477]">
              College: <span className="font-semibold text-[#172033]">{user.college ?? "Not added"}</span>
            </p>
            <p className="text-xs text-[#596477]">
              Locality: <span className="font-semibold text-[#172033]">{user.locality ?? "Not added"}</span>
            </p>
            <p className="text-xs text-[#596477]">
              Joined: <span className="font-semibold text-[#172033]">{new Date(user.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </section>

        <section className="liquid-panel rounded-[30px] p-6">
          <h2 className="text-xl font-black text-[#172033]">Update your profile</h2>
          <p className="mt-1 text-sm text-[#596477]">Students with better profiles get picked first.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">College</label>
              <input
                value={form.college}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                placeholder="Add your college"
                className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Locality</label>
              <select
                value={form.locality}
                onChange={(e) => setForm({ ...form, locality: e.target.value })}
                className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
              >
                <option value="">Add your locality</option>
                {localityOptions.map((place) => <option key={place}>{place}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">About you</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="What are you studying? What kind of work do you do? — a short bio goes here."
                className="mt-2 min-h-28 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#596477] outline-none resize-none"
              />
            </div>
            <button onClick={save} className="genz-button px-5 py-3 text-sm font-black">Save changes</button>
            {message && <p className="text-sm font-semibold text-emerald-700">{message}</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
