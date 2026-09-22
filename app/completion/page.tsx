"use client";

import { useState } from "react";
import { AppShell } from "@/components/site-shell";
import { disputeReasons } from "@/lib/mock-data";

export default function CompletionPage() {
  const [stage, setStage] = useState<"complete" | "dispute">("complete");

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="glass-panel rounded-[30px] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Completion flow</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Business Law Research</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <button
              onClick={() => setStage("complete")}
              className={stage === "complete" ? "rounded-[24px] bg-zinc-900 px-4 py-4 text-left text-white" : "rounded-[24px] border border-zinc-200 bg-zinc-50 px-4 py-4 text-left text-zinc-800"}
            >
              <p className="text-xs uppercase tracking-[0.18em] opacity-80">Provider action</p>
              <p className="mt-2 text-xl font-semibold">Mark as completed</p>
              <p className="mt-2 text-sm opacity-80">Uploads final files, delivery proof, and notes.</p>
            </button>

            <button
              onClick={() => setStage("dispute")}
              className={stage === "dispute" ? "rounded-[24px] bg-zinc-900 px-4 py-4 text-left text-white" : "rounded-[24px] border border-zinc-200 bg-zinc-50 px-4 py-4 text-left text-zinc-800"}
            >
              <p className="text-xs uppercase tracking-[0.18em] opacity-80">Requester action</p>
              <p className="mt-2 text-xl font-semibold">Raise dispute</p>
              <p className="mt-2 text-sm opacity-80">Escalate quality, timing, or mismatch issues for review.</p>
            </button>
          </div>
        </section>

        {stage === "complete" ? (
          <section className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Submit completion</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Completed files</label>
                <div className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
                  Upload PDF, DOCX, or presentation files
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Delivery proof</label>
                <textarea className="mt-2 min-h-24 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" defaultValue="Final summary attached. Case references added and formatting cleaned up." />
              </div>

              <button className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
                Mark completed
              </button>
            </div>
          </section>
        ) : (
          <section className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Raise dispute</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Reason</label>
                <select className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none">
                  {disputeReasons.map((reason) => (
                    <option key={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Description</label>
                <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" defaultValue="The final work did not include the required case citations and the structure was incomplete." />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Evidence</label>
                <div className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
                  Attach screenshots or reference files
                </div>
              </div>

              <button className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">
                Submit dispute
              </button>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
