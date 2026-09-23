"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { localityOptions } from "@/lib/college-data";

type User = { username: string; email: string; college: string | null; locality: string | null; bio: string | null; rating: number; completedTasks: number };

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ college: "", locality: "", bio: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setForm({ 
            college: data.user.college ?? "", 
            locality: data.user.locality ?? "", 
            bio: data.user.bio ?? "" 
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
      body: JSON.stringify(form)
    });
    if (response.ok) {
      setMessage("Profile saved successfully!");
      const data = await response.json();
      if (data?.user) {
        setUser(data.user);
      }
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
        <section className="liquid-panel rounded-[30px] p-6">
          <p className="genz-kicker">Your profile</p>
          <h1 className="mt-3 text-3xl font-black text-[#172033]">{user.username}</h1>
          <p className="mt-2 text-sm text-[#596477]">{user.email}</p>
          
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Rating</p>
              <p className="mt-2 text-2xl font-black text-[#172033]">
                {user.rating ? `${user.rating.toFixed(1)} / 5` : "Not rated yet"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Completed work</p>
              <p className="mt-2 text-2xl font-black text-[#172033]">{user.completedTasks}</p>
            </div>
          </div>
        </section>

        <section className="liquid-panel rounded-[30px] p-6">
          <h2 className="text-xl font-black text-[#172033]">Complete your profile whenever you are ready</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">College</label>
              <input 
                value={form.college} 
                onChange={(e) => setForm({ ...form, college: e.target.value })} 
                placeholder="Add your college later" 
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
                <option value="">Add locality later</option>
                {localityOptions.map((place) => <option key={place}>{place}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">About you</label>
              <textarea 
                value={form.bio} 
                onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                placeholder="Tell others about yourself later" 
                className="mt-2 min-h-24 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none resize-none"
              />
            </div>
            <button 
              onClick={save}
              className="genz-button px-5 py-3 text-sm font-black"
            >
              Save profile
            </button>
            {message && <p className="text-sm font-semibold text-emerald-700">{message}</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}