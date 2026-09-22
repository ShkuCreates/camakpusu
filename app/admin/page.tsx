import { AppShell } from "@/components/site-shell";
import { adminMetrics } from "@/lib/mock-data";

export default function AdminPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {[
            ["Active tasks", adminMetrics.activeTasks],
            ["Completed tasks", adminMetrics.completedTasks],
            ["Pending payments", adminMetrics.pendingPayments],
            ["Pending withdrawals", adminMetrics.pendingWithdrawals],
            ["Open disputes", adminMetrics.openDisputes],
            ["Platform revenue", adminMetrics.platformRevenue],
            ["Registered users", adminMetrics.registeredUsers],
          ].map(([label, value]) => (
            <div key={label} className="glass-panel rounded-[22px] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-zinc-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-[30px] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-zinc-900">Withdrawals</h2>
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">Review queue</span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                { id: "WD-2041", provider: "@Blackbeast", amount: "₹1,240", method: "UPI", status: "WITHDRAWAL_PENDING" },
                { id: "WD-2042", provider: "@StudyNinja", amount: "₹850", method: "Bank account", status: "WITHDRAWAL_PROCESSING" },
              ].map((withdrawal) => (
                <div key={withdrawal.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{withdrawal.id}</p>
                      <p className="text-sm text-zinc-600">{withdrawal.provider} · {withdrawal.method}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Amount</p>
                      <p className="text-lg font-semibold text-zinc-900">{withdrawal.amount}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-white">Approve</button>
                    <button className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700">Mark processing</button>
                    <button className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700">Mark paid</button>
                    <button className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Open disputes</h2>
            <div className="mt-5 space-y-3">
              {[
                { id: "DSP-119", issue: "Late delivery", amount: "₹500" },
                { id: "DSP-120", issue: "Work incomplete", amount: "₹650" },
              ].map((item) => (
                <div key={item.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-semibold text-zinc-900">{item.id}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.issue}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Amount: {item.amount}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
