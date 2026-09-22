import { AppShell } from "@/components/site-shell";
import { profile } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="glass-panel rounded-[30px] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-semibold text-emerald-800">@B</div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Public profile</p>
              <h1 className="mt-2 text-3xl font-semibold text-zinc-900">{profile.username}</h1>
              <p className="mt-2 text-zinc-600">{profile.college} · {profile.locality}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Rating", `⭐ ${profile.rating}`],
              ["Completed tasks", `${profile.completedTasks}`],
              ["Completion rate", `${profile.completionRate}%`],
              ["Member since", profile.memberSince],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">About</h2>
            <p className="mt-4 leading-7 text-zinc-700">{profile.bio}</p>

            <div className="mt-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-sm text-zinc-700">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Verification</h2>
            <div className="mt-4 space-y-3 text-sm text-zinc-700">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">Mobile verified</div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">College verified</div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">Trusted by 32 successful jobs</div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
