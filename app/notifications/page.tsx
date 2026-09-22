import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function NotificationsPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Notifications</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">You are all caught up.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">New offers, messages, task updates, and wallet events will appear here when they happen.</p>
        <Link href="/browse" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Explore tasks</Link>
      </section>
    </AppShell>
  );
}
