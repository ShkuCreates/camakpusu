import Link from "next/link";

import { AppShell } from "@/components/site-shell";

export default function TransactionPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">
        <p className="genz-kicker justify-center">Transaction</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Your transactions appear after an accepted offer.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#596477]">Payment verification, delivery status, disputes, and refunds are attached to real tasks only. No sample transaction is shown here.</p>
        <Link href="/browse" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Browse live tasks</Link>
      </section>
    </AppShell>
  );
}
