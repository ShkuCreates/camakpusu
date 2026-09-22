import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Your space</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Your tasks will live here.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">Sign in to see tasks you posted, offers you sent, and work currently in progress. We do not show placeholder activity.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="genz-button px-5 py-3 text-sm font-black">Sign in</Link>
          <Link href="/signup" className="rounded-full border-2 border-[#172033] px-5 py-3 text-sm font-black text-[#172033]">Create account</Link>
        </div>
      </section>
    </AppShell>
  );
}
