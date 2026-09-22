import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function ProfilePage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Profile</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Your profile starts with you.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">Create an account to add your college, skills, locality, and the kind of work you want to take on. No default account is loaded.</p>
        <Link href="/signup" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Create your profile</Link>
      </section>
    </AppShell>
  );
}
