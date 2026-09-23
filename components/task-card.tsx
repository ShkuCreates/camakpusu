import Link from "next/link";
import { MarketplaceTask } from "@/lib/types";

export function TaskCard({ task }: { task: MarketplaceTask }) {
  const deadline = new Date(task.deadline).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const posted = new Date(task.posted).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <article className="glass-panel campus-hover rounded-[26px] p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{task.requester}</p>
          <h3 className="mt-2 break-words text-xl font-semibold text-zinc-900">{task.title}</h3>
        </div>
        <span className="sticker-tag max-w-[42%] shrink-0 border-lime-300/80 bg-[#f0ffad]/70 text-[#4b6015]">
          {task.status}
        </span>
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-zinc-600">{task.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">{task.category}</span>
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">{task.locality}</span>
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">{task.format}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 items-end gap-4 border-t border-zinc-200/80 pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Due</p>
          <p className="mt-1 text-sm font-medium text-zinc-800">{deadline}</p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Budget</p>
          <p className="mt-1 text-xl font-semibold text-zinc-900">₹{task.budget}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-zinc-500">Posted {posted}</span>
        <Link
          href={`/task/${task.id}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          View task
        </Link>
      </div>
    </article>
  );
}
