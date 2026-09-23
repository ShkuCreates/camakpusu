"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { categoryOptions, collegeOptions, localityOptions } from "@/lib/college-data";

const steps = ["What do you need?", "Describe it", "When & where?", "Review"];

export default function PostTaskPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({
    category: "Assignments",
    title: "",
    description: "",
    deadline: "",
    delivery: "Digital",
    locality: "Noida",
    budget: "",
    college: "",
  });

  const finalSummary = useMemo(
    () => ({
      category: form.category,
      title: form.title,
      deadline: form.deadline,
      budget: form.budget,
      delivery: form.delivery,
      locality: form.locality,
      college: form.college,
    }),
    [form],
  );

  const goNext = () => setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const goBack = () => setStepIndex((current) => Math.max(current - 1, 0));

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-[30px] p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Post a task</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Tell us what you need</h1>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={index <= stepIndex ? "rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-white" : "rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600"}
              >
                {index + 1}. {step}
              </div>
            ))}
          </div>

          {stepIndex === 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 outline-none"
                >
                  {categoryOptions.map((category) => <option key={category}>{category}</option>)}
                </select>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Delivery type</label>
                <select
                  value={form.delivery}
                  onChange={(event) => setForm((current) => ({ ...current, delivery: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 outline-none"
                >
                  <option>Digital</option>
                  <option>Physical</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Title</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-2 min-h-32 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Requirements</label>
                <textarea
                  placeholder="Add the details someone needs to do a great job"
                  className="mt-2 min-h-24 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                />
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Budget</label>
                <input
                  value={form.budget}
                  onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Broad locality</label>
                <select
                  value={form.locality}
                  onChange={(event) => setForm((current) => ({ ...current, locality: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                >
                  {localityOptions.map((place) => <option key={place}>{place}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">College</label>
                <input
                  list="college-directory"
                  required
                  value={form.college}
                  onChange={(event) => setForm((current) => ({ ...current, college: event.target.value }))}
                  placeholder="Search and select your college"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-3 text-sm text-zinc-700 outline-none"
                />
                <datalist id="college-directory">
                  {collegeOptions.map((college) => <option key={college.name} value={college.name}>{college.group}</option>)}
                </datalist>
                {(() => {
                  const selectedCollege = collegeOptions.find((college) => college.name === form.college);
                  return selectedCollege ? (
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      <img src={`https://www.google.com/s2/favicons?domain=${selectedCollege.domain}&sz=32`} alt="" className="h-5 w-5 rounded-full bg-white" />
                      <span>{selectedCollege.name}</span>
                    </div>
                  ) : null;
                })()}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Attachments</label>
                <div className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
                  Drop files here or browse
                </div>
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="rounded-[26px] border border-zinc-200 bg-zinc-50 p-5">
              <h2 className="text-xl font-semibold text-zinc-900">Task preview</h2>
              <div className="mt-5 space-y-3 text-sm text-zinc-700">
                <div className="grid gap-1 rounded-xl border border-zinc-200 bg-white px-3 py-2 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4">
                  <span>Title</span>
                  <span className="break-words font-semibold text-zinc-900 sm:text-right">{finalSummary.title}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                  <span>Category</span>
                  <span className="font-semibold text-zinc-900">{finalSummary.category}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                  <span>Delivery</span>
                  <span className="font-semibold text-zinc-900">{finalSummary.delivery}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                  <span>Deadline</span>
                  <span className="font-semibold text-zinc-900">{finalSummary.deadline}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                  <span>Budget</span>
                  <span className="font-semibold text-zinc-900">₹{finalSummary.budget}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                  <span>Locality</span>
                  <span className="font-semibold text-zinc-900">{finalSummary.locality}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                  <span>College</span>
                  <span className="text-right font-semibold text-zinc-900">{finalSummary.college || "Not selected"}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <button
              onClick={goBack}
              disabled={stepIndex === 0}
              className="rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {stepIndex < steps.length - 1 ? (
              <button onClick={goNext} className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">
                Continue
              </button>
            ) : (
              <a href="/login" className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
                Sign in to post
              </a>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
