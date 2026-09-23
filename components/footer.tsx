import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 px-4 py-6 backdrop-blur-xl lg:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900 bg-[#d9f85a] text-sm font-black text-[#172033] shadow-[3px_3px_0_#172033]">
                C
              </div>
              <div>
                <div className="text-sm font-black tracking-[0.2em] text-[#172033] uppercase">Campus</div>
                <div className="text-base font-black text-[#4968ff]">Aid <span className="text-[#ff765f]">.</span></div>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-600">
              Connecting students for academic help and earning opportunities across Delhi NCR.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/browse" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link href="/post-task" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Post a Task
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Wallet
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Connect</h3>
            <div className="mt-4 space-y-3">
              <a
                href="https://instagram.com/campus.aid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@campus.aid</span>
              </a>
              <p className="text-sm text-zinc-600">
                Follow us for updates, tips, and student success stories.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8 text-center">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} CampusAid. All rights reserved. Made with ❤️ for students.
          </p>
        </div>
      </div>
    </footer>
  );
}