"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/site-shell";

type AdminUser = { id: string; username: string; email: string; college: string | null; role: "ADMIN" | "STUDENT"; createdAt: string };

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setUsers(result);
      })
      .catch((reason: Error) => setError(reason.message));
  }, []);

  async function changeRole(userId: string, role: "ADMIN" | "STUDENT") {
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    const result = await response.json();
    if (!response.ok) return setError(result.error ?? "Role update failed.");
    setUsers((current) => current.map((user) => user.id === userId ? { ...user, role } : user));
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="liquid-panel rounded-[30px] p-6">
          <p className="genz-kicker">Admin console</p>
          <h1 className="mt-3 text-3xl font-black text-[#172033]">Manage campus access</h1>
          <p className="mt-2 text-sm leading-6 text-[#596477]">Promote trusted accounts to admin with one click. This screen is protected by the admin session.</p>
        </section>

        {error ? (
          <section className="liquid-panel rounded-[30px] p-8 text-center"><h2 className="text-xl font-bold text-[#172033]">{error}</h2><Link href="/login" className="mt-5 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Sign in</Link></section>
        ) : (
          <section className="liquid-panel rounded-[30px] p-6">
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/55 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="font-bold text-[#172033]">{user.username}</p><p className="text-sm text-[#596477]">{user.email} · {user.college ?? "College not added"}</p></div>
                  <button onClick={() => changeRole(user.id, user.role === "ADMIN" ? "STUDENT" : "ADMIN")} className={`rounded-full px-4 py-2 text-sm font-black ${user.role === "ADMIN" ? "border border-zinc-300 bg-white text-zinc-700" : "bg-[#4968ff] text-white"}`}>
                    {user.role === "ADMIN" ? "Remove admin" : "Make admin"}
                  </button>
                </div>
              ))}
              {!users.length && <p className="py-8 text-center text-sm text-[#596477]">No users found.</p>}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
