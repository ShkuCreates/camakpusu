"use client";

import { useState, FormEvent } from "react";
import { AppShell } from "@/components/site-shell";

const disputeReasons = ["Incomplete work", "Poor quality", "Late delivery", "Mismatch with requirements", "Other"];

export default function CompletionPage() {
  const [stage, setStage] = useState<"complete" | "dispute">("complete");
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState("");
  async function complete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const response = await fetch(`/api/tasks/${taskId}/complete`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes: data.get("notes"), files: data.get("files") }) }); const result = await response.json(); setMessage(response.ok ? "Work submitted. The requester can now confirm it." : result.error);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="glass-panel rounded-[30px] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Completion flow</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Complete a task</h1>

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
          <form onSubmit={complete} className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Submit completion</h2>
            <div className="mt-5 space-y-4">
              <input value={taskId} onChange={(event) => setTaskId(event.target.value)} required placeholder="Completed task ID" className="min-h-11 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 text-sm outline-none" />
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Completed files</label>
                <input name="files" placeholder="File links (optional)" className="mt-2 min-h-11 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 text-sm outline-none" />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Delivery proof</label>
                <textarea name="notes" className="mt-2 min-h-24 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" placeholder="Add delivery notes for the requester" />
              </div>

              <button className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
                Mark completed
              </button>
              {message && <p className="text-sm font-semibold text-emerald-700">{message}</p>}
            </div>
          </form>
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
                <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none" placeholder="Explain what needs review" />
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
