import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function WalletPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Wallet</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Your balance starts at zero.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">Complete a real task and your verified earnings will appear here. We never display seeded balances or transactions.</p>
        <Link href="/browse" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Find work</Link>
      </section>
    </AppShell>
  );
}
