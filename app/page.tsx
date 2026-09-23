import Link from "next/link";

import { AppShell } from "@/components/site-shell";
import { CampusPulse } from "@/components/campus-pulse";

const categories = [
  { label: "Study rescue", detail: "Tutoring + research", tone: "blue" },
  { label: "Make it pretty", detail: "Design + decks", tone: "lime" },
  { label: "Words, but better", detail: "Proofreading + format", tone: "coral" },
  { label: "Notes that hit", detail: "Summaries + revision", tone: "violet" },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8 pb-8 md:space-y-12">
        <section className="relative isolate overflow-hidden rounded-[34px] border-2 border-[#172033] bg-[#f4f0e8] px-5 py-6 shadow-[8px_8px_0_#172033] sm:px-8 sm:py-8 lg:px-12 lg:py-12">
          <div className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-[#d9f85a] blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 -z-10 h-72 w-72 rounded-full bg-[#ff765f]/25 blur-3xl" />

          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#d9f85a] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#172033]">Made for campus life</span>
                <span className="text-sm font-semibold text-[#596477]">You bring the skill. We bring the people.</span>
              </div>

              <h1 className="mt-6 max-w-3xl text-[2.75rem] font-black leading-[0.98] tracking-[-0.04em] text-[#172033] sm:text-6xl sm:tracking-[-0.055em] lg:text-8xl">
                Your deadline
                <span className="relative mx-2 inline-block text-[#4968ff]">
                  called.
                  <span className="absolute -bottom-1 left-0 h-2 w-full -rotate-2 rounded-full bg-[#ff765f]" />
                </span>
                <br />
                Your people are here.
              </h1>

              <p className="mt-7 max-w-xl text-base font-medium leading-7 text-[#596477] sm:text-lg">
                CampusAid is the low-key way to get unstuck, find your next paid gig, and meet students who actually get it.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/post-task" className="genz-button inline-flex items-center justify-center px-6 py-3.5 text-sm font-black">
                  I need a little help <span className="ml-2 text-lg">↗</span>
                </Link>
                <Link href="/browse" className="inline-flex items-center justify-center rounded-full border-2 border-[#172033] bg-white/70 px-6 py-3.5 text-sm font-black text-[#172033] shadow-[3px_3px_0_#172033] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#172033]">
                  I want to earn <span className="ml-2 text-lg">✦</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.13em] text-[#596477]">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff765f]" /> No awkward DMs</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#4968ff]" /> Clear budgets</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#d9f85a]" /> Real students</span>
              </div>
            </div>

            <CampusPulse />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="campus-stat"><span className="text-3xl">⚡</span><div><p className="text-2xl font-black text-[#172033]">Your brief</p><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#596477]">becomes a real listing</p></div></div>
          <div className="campus-stat"><span className="text-3xl">♡</span><div><p className="text-2xl font-black text-[#172033]">Your skill</p><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#596477]">finds the right student</p></div></div>
          <div className="campus-stat"><span className="text-3xl">✦</span><div><p className="text-2xl font-black text-[#172033]">Your pace</p><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#596477]">starts when you are ready</p></div></div>
        </section>

        <section>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="genz-kicker">Pick your side quest</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#172033] sm:text-4xl">What are we getting into?</h2>
            </div>
            <p className="max-w-xs text-sm font-medium leading-6 text-[#596477]">No gatekeeping. No weird corporate energy. Just useful student-to-student help.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.label} href="/browse" className={`campus-category campus-category-${category.tone}`}>
                <span className="text-2xl">{category.tone === "blue" ? "✎" : category.tone === "lime" ? "✦" : category.tone === "coral" ? "Aa" : "⌁"}</span>
                <h3 className="mt-6 text-lg font-black text-[#172033]">{category.label}</h3>
                <p className="mt-1 text-sm font-semibold text-[#596477]">{category.detail}</p>
                <span className="mt-5 text-sm font-black text-[#172033]">Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[30px] border-2 border-[#172033] bg-[#172033] p-5 text-white shadow-[7px_7px_0_#4968ff] sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9f85a]">New here?</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">See how CampusAid works.</h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/70">
              Watch the quick tour to learn how to post a task, find student work, send offers, and get things moving without the awkwardness.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-[#172033]">
              <span className="rounded-full bg-[#d9f85a] px-3 py-2">01 · Post</span>
              <span className="rounded-full bg-[#ff765f] px-3 py-2">02 · Match</span>
              <span className="rounded-full bg-[#b8c4ff] px-3 py-2">03 · Done</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border-2 border-white/30 bg-black/30 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="How to use CampusAid"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-[30px] border-2 border-[#172033] bg-[#d9f85a] p-6 shadow-[7px_7px_0_#172033] md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4968ff]">A little nudge</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-[#172033]">You do not have to figure out the whole semester today.</h2>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-[#314158]">Start with one task, one skill, or one honest “can someone help?” That counts.</p>
          </div>
          <Link href="/post-task" className="inline-flex items-center justify-center rounded-full border-2 border-[#172033] bg-[#ff765f] px-6 py-3.5 text-sm font-black text-[#172033] shadow-[4px_4px_0_#172033] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#172033]">Let’s do this ↗</Link>
        </section>
      </div>
    </AppShell>
  );
}
