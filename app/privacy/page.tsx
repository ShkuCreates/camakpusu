import { AppShell } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8">
        <p className="genz-kicker">Legal</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#596477]">
          CampusAid ("we", "us", "our") is built for students, and we treat your data the way we'd want our own to be treated.
          This Privacy Policy explains what we collect, why we collect it, how we use it, and your rights.
        </p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-[#596477]">
          <section>
            <h2 className="font-bold text-[#172033]">1. Who we are</h2>
            <p className="mt-2">
              CampusAid is a marketplace platform for students enrolled in educational institutions.
              If you have questions about this policy or how your data is handled, email us at support@campusaid.online
              or message @campus.aid on Instagram.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">2. Information we collect</h2>
            <p className="mt-2">We collect only the minimum information needed to run the service.</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li><strong className="text-[#172033]">Account data:</strong> your username, email address, password (stored only as a secure cryptographic hash), college, and locality you provide during signup.</li>
              <li><strong className="text-[#172033]">Profile data:</strong> bio, profile information, ratings, and completed-task counts that build up as you use the platform.</li>
              <li><strong className="text-[#172033]">Task & transaction data:</strong> tasks you post or accept, offers you make or receive, messages you send through the platform, disputes, ratings, wallet entries, and withdrawals.</li>
              <li><strong className="text-[#172033]">Session data:</strong> a server-signed cookie used to keep you logged in. We do not use tracking cookies.</li>
              <li><strong className="text-[#172033]">Security & debug data:</strong> brief server-side logs of errors and authentication events, automatically deleted within 30 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">3. How we use your information</h2>
            <p className="mt-2">We use the above data only to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Authenticate you and keep your account secure.</li>
              <li>Allow you to post tasks, receive offers, send messages, and rate other users.</li>
              <li>Process wallet balances, payments, and withdrawals.</li>
              <li>Show you personalised content such as tasks near your college or locality.</li>
              <li>Run admin and moderation workflows (anti-fraud, dispute resolution, policy enforcement).</li>
              <li>Email you only for essential service updates — for example, password reset, dispute updates, or withdrawal confirmations. We do not send marketing newsletters without your explicit opt-in.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">4. Legal basis & storage location</h2>
            <p className="mt-2">
              We process your data because it is necessary to perform the contract you agree to when creating an account,
              and because of our legitimate interests in operating a safe, trusted marketplace. Your data is stored in
              secure managed infrastructure provided by Supabase and Render, with databases hosted on servers located
              in the Asia-Pacific region.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">5. Who we share data with</h2>
            <p className="mt-2">We do not sell personal data. We only share what is strictly necessary with:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li><strong className="text-[#172033]">Other users:</strong> your username, college, rating, and posted tasks are visible to signed-in users. Direct messages are visible only to the sender and recipient.</li>
              <li><strong className="text-[#172033]">Service providers:</strong> Supabase (database & auth infrastructure), Render (hosting), and any payment processor we integrate with — all bound by appropriate data-processing agreements.</li>
              <li><strong className="text-[#172033]">Authorities:</strong> only when required by a valid court order or legal request that we cannot lawfully reject.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">6. Cookies & similar technologies</h2>
            <p className="mt-2">
              CampusAid uses a single essential cookie called <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[#172033]">campusaid_session</code> to remember that you are logged in.
              It is HTTP-only, secured with HMAC-SHA256, marked Secure in production, and carries no advertising or tracking identifiers.
              We do not use Google Analytics, Meta Pixel, or any third-party behavioural tracker.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">7. How we keep data secure</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Passwords are hashed using scrypt with a unique 16-byte salt per user.</li>
              <li>Session tokens are HMAC-SHA256 signed with a server secret.</li>
              <li>All traffic runs over HTTPS (TLS 1.2+).</li>
              <li>Infrastructure access is restricted to a small number of named administrators.</li>
              <li>We run regular reviews of permissions and error logs.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">8. Data retention</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Your account and associated task history are kept until you request deletion.</li>
              <li>Withdrawal records are kept for 7 years for accounting compliance.</li>
              <li>Debug & server logs are automatically deleted after 30 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">9. Your rights</h2>
            <p className="mt-2">
              Depending on your jurisdiction, you may have rights to: access the personal data we hold about you,
              request correction, request deletion ("right to be forgotten"), object to or restrict processing,
              request portability (receive your data in a machine-readable format), and withdraw consent where processing
              was based on consent. To exercise any of these, email support@campusaid.online.
              We will respond within 14 calendar days.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">10. Children & age limit</h2>
            <p className="mt-2">
              CampusAid is not intended for users under the age of 18 (or the age of majority in your jurisdiction),
              and we do not knowingly collect any data from minors. If you believe an underage account has been created,
              please notify us and we will remove the data promptly.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">11. Changes to this policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. If the changes are material, we will notify you by
              email or via an in-app banner before they take effect. The "Last updated" date at the bottom always shows
              the latest revision.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">12. Contact</h2>
            <p className="mt-2">
              For privacy concerns, deletion requests, or data portability, email <a href="mailto:support@campusaid.online" className="font-bold underline underline-offset-4 text-[#172033]">support@campusaid.online</a> or message
              <a href="https://instagram.com/campus.aid" target="_blank" rel="noopener noreferrer" className="ml-1 font-bold underline underline-offset-4 text-[#172033]">@campus.aid</a> on Instagram.
            </p>
          </section>
        </div>

        <p className="mt-10 text-center text-xs text-[#596477]">Last updated: {new Date().toLocaleDateString()}</p>
      </section>
    </AppShell>
  );
}
