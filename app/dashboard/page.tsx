import { AppShell } from "@/components/site-shell";
import { tasks, walletTransactions } from "@/lib/mock-data";

export default function DashboardPage() {
  const activeTasks = tasks.filter((task) => task.status !== "Open").slice(0, 3);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Your active tasks", "6"],
            ["Offers received", "12"],
            ["Tasks awaiting confirmation", "3"],
            ["Messages", "9"],
          ].map(([label, value]) => (
            <div key={label} className="glass-panel rounded-2xl p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel rounded-[28px] p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-zinc-900">Active tasks</h2>
              <span className="text-sm text-zinc-500">Updated today</span>
            </div>

            <div className="mt-5 space-y-4">
              {activeTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900">{task.title}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{task.locality} · {task.deadline}</p>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-700">
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-zinc-600">
                    <span>{task.requester}</span>
                    <span className="font-semibold text-zinc-900">₹{task.budget}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[28px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Recent transactions</h2>
            <div className="mt-5 space-y-3">
              {walletTransactions.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{item.description}</p>
                    <p className="text-xs text-zinc-500">{item.date}</p>
                  </div>
                  <span className={item.amount > 0 ? "text-sm font-semibold text-emerald-700" : "text-sm font-semibold text-zinc-700"}>
                    {item.amount > 0 ? `+₹${item.amount}` : `-₹${Math.abs(item.amount)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
