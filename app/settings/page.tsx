import { AppShell } from "@/components/site-shell";
import { platformSettings } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[30px] border border-zinc-200 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Communication & platform preferences</h1>
        </section>

        <section className="space-y-4">
          {platformSettings.map((setting) => (
            <div key={setting.label} className="flex flex-col gap-4 rounded-[26px] border border-zinc-200 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.02)] md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">{setting.label}</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">{setting.description}</p>
              </div>

              <button
                className={`inline-flex min-w-[108px] items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition ${
                  setting.enabled
                    ? "bg-emerald-600 text-white"
                    : "border border-zinc-200 bg-zinc-100 text-zinc-700"
                }`}
              >
                {setting.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-[30px] border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Safety & compliance rules</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
            <li>• Only share academic information required for task completion and payment verification.</li>
            <li>• Do not accept external payment requests outside the CampusAid escrow flow.</li>
            <li>• Report suspicious behavior, policy breaches, or fake profiles through the admin review queue.</li>
          </ul>

          <button className="mt-5 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">
            Save preferences
          </button>
        </section>
      </div>
    </AppShell>
  );
}