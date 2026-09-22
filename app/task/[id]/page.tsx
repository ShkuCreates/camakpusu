"use client";

import Link from "next/link";
import { use, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { offers, tasks } from "@/lib/mock-data";

export default function TaskPage({ params }: { params: Promise<{ id: string }> }) {
  const [offerList, setOfferList] = useState(offers);
  const [submitted, setSubmitted] = useState(false);

  const { id } = use(params);
  const task = tasks.find((entry) => entry.id === id) ?? tasks[0];

  const handleOfferSubmit = () => {
    setSubmitted(true);
  };

  const handleAccept = (provider: string) => {
    setOfferList((current) =>
      current.map((offer) =>
        offer.provider === provider ? { ...offer, amount: offer.amount } : { ...offer },
      ),
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[30px] border border-zinc-200/80 bg-white/70 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{task.category}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{task.title}</h1>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              {task.status}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Requester</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{task.requester}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Locality</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{task.locality}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Deadline</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{task.deadline}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Budget</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">₹{task.budget}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6 rounded-[30px] border border-zinc-200/80 bg-white/70 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Description</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700">{task.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Requirements</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {task.requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Attachments</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {task.attachments.length ? (
                  task.attachments.map((file) => (
                    <span key={file} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                      {file}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-dashed border-zinc-300 px-3 py-2 text-sm text-zinc-500">No attachments</span>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6 rounded-[30px] border border-zinc-200/80 bg-white/70 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Offer</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Make an offer</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Proposed price</label>
                <input className="mt-2 w-full rounded-xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm text-zinc-700 outline-none" defaultValue="₹480" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Completion time</label>
                <input className="mt-2 w-full rounded-xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm text-zinc-700 outline-none" defaultValue="1 day" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Short message</label>
                <textarea className="mt-2 min-h-28 w-full rounded-xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm text-zinc-700 outline-none" defaultValue="I can present the findings in a structured format and keep turnaround fast." />
              </div>
            </div>

            <button onClick={handleOfferSubmit} className="w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
              {submitted ? "Offer sent" : "Submit offer"}
            </button>
          </aside>
        </div>

        <section className="rounded-[30px] border border-zinc-200/80 bg-white/70 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900">Active offers</h2>
            <Link href="/browse" className="text-sm font-medium text-emerald-700">
              Back to browse
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {offerList.map((offer) => (
              <div key={offer.provider} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-zinc-900">{offer.provider}</p>
                    <p className="text-sm text-zinc-500">⭐ {offer.rating} · {offer.completed} completed tasks</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm uppercase tracking-[0.15em] text-zinc-500">Offer</p>
                    <p className="text-xl font-semibold text-zinc-900">₹{offer.amount}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-700">{offer.message}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
                    Estimated completion: {offer.eta}
                  </span>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700">
                      Decline
                    </button>
                    <button onClick={() => handleAccept(offer.provider)} className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                      Accept offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
