import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(43,88,64,0.12),_transparent_20%),_#f7f4ef] px-4">
      <div className="w-full max-w-md rounded-[30px] border border-zinc-200/80 bg-white/75 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">CampusAid</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Username</label>
            <input className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700 outline-none" defaultValue="@Blackbeast" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Password</label>
            <input type="password" className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700 outline-none" defaultValue="password123" />
          </div>
        </div>

        <Link href="/" className="mt-6 block w-full rounded-full bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white">Log in</Link>
        <p className="mt-4 text-center text-sm text-zinc-500">
          New here? <Link href="/signup" className="font-medium text-zinc-900">Create account</Link>
        </p>
      </div>
    </div>
  );
}
