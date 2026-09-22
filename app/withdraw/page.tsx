"use client";

import { AppShell } from "@/components/site-shell";

export default function WithdrawPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-[30px] p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Withdraw</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Request payout</h1>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Available balance</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">₹1,240</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Minimum withdrawal</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">₹500</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Amount</label>
              <input className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" defaultValue="₹500" />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Method</label>
              <select className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none">
                <option>UPI</option>
                <option>Bank account</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">UPI ID</label>
              <input className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" placeholder="yourname@upi" />
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              Withdrawal requests are reviewed manually by admin and marked as WITHDRAWAL_PENDING until approval.
            </div>

            <button className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">Submit withdrawal</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
