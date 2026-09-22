import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function SettingsPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Settings</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Preferences follow your account.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">Sign in to manage notification preferences, college details, and account security.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Sign in</Link>
      </section>
    </AppShell>
  );
}
