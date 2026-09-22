"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse Tasks" },
  { href: "/post-task", label: "Post a Task" },
  { href: "/dashboard", label: "My Tasks" },
  { href: "/messages", label: "Messages" },
  { href: "/wallet", label: "Wallet" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(43,88,64,0.08),_transparent_24%),_#f7f4ef] text-zinc-900">
      <header className="sticky top-0 z-40 px-3 py-2 sm:px-5">
        <div className="liquid-header mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-2 sm:px-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900 bg-[#d9f85a] text-sm font-black text-[#172033] shadow-[3px_3px_0_#172033]">
              C
            </div>
            <div>
              <div className="text-sm font-black tracking-[0.2em] text-[#172033] uppercase">Campus</div>
              <div className="text-base font-black text-[#4968ff]">Aid <span className="text-[#ff765f]">.</span></div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-zinc-700 lg:flex">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`relative rounded-full px-3 py-2 transition hover:text-zinc-900 ${pathname === item.href ? "liquid-nav-active text-zinc-900" : "text-zinc-600"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/notifications" aria-label="Open notifications. You have new updates." title="Notifications" className="liquid-control relative hidden h-11 w-11 items-center justify-center text-zinc-800 transition sm:inline-flex">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022c1.733.64 3.554 1.087 5.453 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              
            </Link>

            <Link href="/login" className="hidden rounded-full px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-white/60 sm:inline-flex">Sign in</Link>
            <Link href="/signup" className="liquid-control inline-flex px-4 py-2 text-sm font-bold text-zinc-800 transition">Create account</Link>

            <details className="relative hidden lg:block">
              <summary className="list-none">
                <div className="liquid-action flex h-11 w-11 items-center justify-center rounded-full text-xl font-light text-white">
                  +
                </div>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-zinc-200 bg-white/80 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <Link href="/post-task" className="block rounded-xl px-3 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                  <span className="block font-semibold text-zinc-900">Post a Task</span>
                  <span className="mt-1 block text-xs text-zinc-500">I need someone to help me</span>
                </Link>
                <Link href="/browse" className="mt-2 block rounded-xl px-3 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                  <span className="block font-semibold text-zinc-900">Find Work</span>
                  <span className="mt-1 block text-xs text-zinc-500">I want to earn by completing tasks</span>
                </Link>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/80 bg-[#f7f4ef]/90 px-3 py-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2">
          <Link href="/" className="flex flex-col items-center gap-1 text-[11px] font-medium text-zinc-600">
            <span>Home</span>
          </Link>
          <Link href="/browse" className="flex flex-col items-center gap-1 text-[11px] font-medium text-zinc-600">
            <span>Browse</span>
          </Link>
          <details className="relative">
            <summary className="list-none">
              <div className="liquid-action flex h-12 w-12 items-center justify-center rounded-full text-2xl font-light text-white">
                +
              </div>
            </summary>
            <div className="absolute bottom-16 left-1/2 w-52 -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white/85 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <Link href="/post-task" className="block rounded-xl px-3 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                <span className="block font-semibold text-zinc-900">Post a Task</span>
              </Link>
              <Link href="/browse" className="mt-2 block rounded-xl px-3 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                <span className="block font-semibold text-zinc-900">Find Work</span>
              </Link>
            </div>
          </details>
          <Link href="/messages" className="flex flex-col items-center gap-1 text-[11px] font-medium text-zinc-600">
            <span>Messages</span>
          </Link>
          <Link href="/notifications" className="flex flex-col items-center gap-1 text-[11px] font-medium text-zinc-600">
            <span>Alerts</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center gap-1 text-[11px] font-medium text-zinc-600">
            <span>Sign in</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
