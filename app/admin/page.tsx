import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function AdminPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Admin</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">The review queue is empty.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">Admin metrics, disputes, and withdrawals will appear here from the database after an authenticated admin session is connected.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Sign in</Link>
      </section>
    </AppShell>
  );
}
