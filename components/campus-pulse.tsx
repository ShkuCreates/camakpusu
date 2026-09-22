"use client";

import Link from "next/link";
import { useState } from "react";

const pulseModes = {
  help: {
    label: "Need help",
    title: "Deadline mode: activated",
    body: "Drop the brief. Let someone from your campus help you get unstuck.",
    action: "Post a task",
    href: "/post-task",
    accent: "#ff765f",
  },
  earn: {
    label: "Want to earn",
    title: "Your side quest is waiting",
    body: "Turn the thing you are good at into your next student-to-student gig.",
    action: "Find a task",
    href: "/browse",
    accent: "#d9f85a",
  },
  vibe: {
    label: "Just browsing",
    title: "Main character, low pressure",
    body: "Look around, find your people, and save a task for when the timing feels right.",
    action: "Explore CampusAid",
    href: "/browse",
    accent: "#b8c4ff",
  },
} as const;

type PulseMode = keyof typeof pulseModes;

export function CampusPulse() {
  const [mode, setMode] = useState<PulseMode>("help");
  const current = pulseModes[mode];

  return (
    <div className="relative mx-auto w-full max-w-sm lg:mb-2">
      <div className="absolute -right-4 -top-5 z-10 rotate-6 rounded-2xl border-2 border-[#172033] bg-[#ff765f] px-4 py-2 text-sm font-black text-[#172033] shadow-[4px_4px_0_#172033]">main character energy</div>
      <div className="rotate-[-2deg] rounded-[28px] border-2 border-[#172033] bg-[#4968ff] p-3 shadow-[8px_8px_0_#172033]">
        <div className="rounded-[21px] border-2 border-[#172033] bg-[#f9f8f4] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#596477]">Campus pulse</span>
            <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Live</span>
          </div>

          <div className="mt-5 flex gap-1.5 rounded-2xl bg-[#e9eaf1] p-1">
            {(Object.keys(pulseModes) as PulseMode[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`flex-1 rounded-xl px-2 py-2 text-[10px] font-black uppercase tracking-[0.08em] transition ${mode === key ? "bg-[#172033] text-white shadow-sm" : "text-[#596477] hover:text-[#172033]"}`}
              >
                {pulseModes[key].label}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[174px] transition-all" key={mode}>
            <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#172033]" style={{ backgroundColor: current.accent }}>{current.label}</span>
            <p className="mt-4 text-3xl font-black leading-none tracking-[-0.05em] text-[#172033]">{current.title}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#596477]">{current.body}</p>
          </div>

          <Link href={current.href} className="mt-2 inline-flex w-full items-center justify-center rounded-full border-2 border-[#172033] bg-[#172033] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#4968ff]">
            {current.action} <span className="ml-2">↗</span>
          </Link>

          <div className="mt-6 border-t-2 border-dashed border-[#172033]/20 pt-4 text-sm font-bold text-[#172033]">
            “Found my design side quest here.”
            <span className="mt-1 block text-xs font-semibold text-[#596477]">— someone from your campus</span>
          </div>
        </div>
      </div>
    </div>
  );
}
