import Link from "next/link";

import { AppShell } from "@/components/site-shell";
import { notifications } from "@/lib/mock-data";

export default function NotificationsPage() {
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="flex flex-col gap-4 rounded-[30px] border border-zinc-200 bg-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Notifications</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Your alerts and updates</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
              {unreadCount} unread
            </div>
            <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Mark all read</button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className={`rounded-[26px] border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.02)] ${
                  notification.unread
                    ? "border-emerald-200 bg-emerald-50/60"
                    : "border-zinc-200 bg-white/80"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                      {notification.category.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-zinc-900">{notification.title}</h2>
                        {notification.unread && (
                          <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-700">
                            New
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{notification.body}</p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-xs font-medium text-zinc-500">{notification.time}</span>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-zinc-200 bg-white/80 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.03)]">
              <h2 className="text-lg font-semibold text-zinc-900">Quick filters</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "All",
                  "Offers",
                  "Wallet",
                  "Messages",
                  "Admin",
                ].map((filter) => (
                  <button
                    key={filter}
                    className={`rounded-full border px-3 py-2 text-xs font-medium ${
                      filter === "All"
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-white/80 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.03)]">
              <h2 className="text-lg font-semibold text-zinc-900">Notification settings</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Tune your update preferences for offers, wallet, messages, and administrative review notices.
              </p>

              <Link href="/settings" className="mt-4 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
                Manage preferences
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}