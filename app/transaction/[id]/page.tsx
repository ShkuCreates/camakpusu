import { AppShell } from "@/components/site-shell";
import { paymentTimeline, transactionStates } from "@/lib/mock-data";

export default function TransactionPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="glass-panel rounded-[30px] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Transaction</p>
              <h1 className="mt-2 text-3xl font-semibold text-zinc-900">#TX-10492</h1>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">PAYMENT_CONFIRMED</div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Task amount</p>
              <p className="mt-2 text-2xl font-semibold text-zinc-900">₹500</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Requester</p>
              <p className="mt-2 text-xl font-semibold text-zinc-900">@Rahul</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Provider</p>
              <p className="mt-2 text-xl font-semibold text-zinc-900">@Blackbeast</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">State machine</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {transactionStates.map((state, index) => (
                <span
                  key={state}
                  className={index <= 5 ? "rounded-full bg-zinc-900 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white" : "rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600"}
                >
                  {state}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Payment verification</h2>
            <div className="mt-5 space-y-3">
              {paymentTimeline.map((item) => (
                <div key={item.label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-sm font-medium text-zinc-900">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
