import { AppShell } from "@/components/site-shell";
import { conversations, paymentTimeline } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel rounded-[30px] p-2">
          <div className="grid gap-2 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-[24px] border border-zinc-200 bg-white/80 p-3">
              <div className="mb-4 flex items-center justify-between px-2 pt-2">
                <h2 className="text-lg font-semibold text-zinc-900">Conversations</h2>
                <span className="rounded-full bg-zinc-900 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">{conversations.length}</span>
              </div>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <button key={conversation.id} className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-left transition hover:bg-zinc-100">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-zinc-900">{conversation.name}</span>
                      {conversation.unread > 0 && (
                        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">{conversation.unread}</span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{conversation.preview}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-zinc-400">{conversation.time}</p>
                  </button>
                ))}
              </div>
            </aside>

            <section className="flex min-h-[620px] flex-col rounded-[24px] border border-zinc-200 bg-white/85">
              <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-zinc-500">Transaction #TX-10492</p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-900">@Rahul</h3>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">PAYMENT_CONFIRMED · ACTIVE</span>
              </div>

              <div className="flex-1 space-y-4 bg-[linear-gradient(#f6f6f4,#faf8f5)] p-5">
                <div className="max-w-sm rounded-2xl rounded-bl-md bg-zinc-900 px-4 py-3 text-sm text-white">
                  Task accepted.
                </div>
                <div className="ml-auto max-w-sm rounded-2xl rounded-br-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800">
                  Thanks, I’ve attached the brief and reference list.
                </div>
                <div className="max-w-md rounded-[24px] border border-zinc-200 bg-white/90 p-4 text-sm text-zinc-700 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Task details</p>
                  <div className="mt-3 space-y-2">
                    <p><span className="font-medium text-zinc-900">Title:</span> Business Law Research</p>
                    <p><span className="font-medium text-zinc-900">Deadline:</span> 28 September</p>
                    <p><span className="font-medium text-zinc-900">Budget:</span> ₹500</p>
                    <p><span className="font-medium text-zinc-900">Format:</span> Digital</p>
                    <p><span className="font-medium text-zinc-900">Requirements:</span> Case-based summary, source list, clean formatting.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 bg-white/80 p-4">
                <div className="mb-4 grid gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 md:grid-cols-2 xl:grid-cols-4">
                  {paymentTimeline.map((item) => (
                    <div key={item.label} className="rounded-xl border border-zinc-200 bg-white px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">{item.label}</p>
                      <p className="mt-2 text-xs font-medium text-zinc-700">{item.time}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <input className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 outline-none" placeholder="Type a message" />
                  <button className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white">Send</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
