"use client";

import { AppShell } from "@/components/site-shell";
import { walletTransactions } from "@/lib/mock-data";

export default function WalletPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["AVAILABLE", "₹1,240"],
            ["PENDING", "₹500"],
            ["TOTAL EARNED", "₹4,850"],
            ["TOTAL WITHDRAWN", "₹3,610"],
          ].map(([label, value]) => (
            <div key={label} className="glass-panel rounded-[24px] p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="glass-panel rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Wallet</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Transaction history</h2>
            </div>
            <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Withdraw</button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              {walletTransactions.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white/85 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{item.id}</p>
                    <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-400">{item.date} · {item.status}</p>
                  </div>
                  <span className={item.amount > 0 ? "text-lg font-semibold text-emerald-700" : "text-lg font-semibold text-zinc-700"}>
                    {item.amount > 0 ? `+₹${item.amount}` : `-₹${Math.abs(item.amount)}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
              <h3 className="text-lg font-semibold text-zinc-900">Wallet rule</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                Funds are released only after requester confirmation or admin confirmation. Until then, the balance remains pending and cannot be withdrawn.
              </p>
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                Pending balance: ₹500
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
