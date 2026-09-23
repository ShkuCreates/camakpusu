import { AppShell } from "@/components/site-shell";

export default function TermsPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8">
        <p className="genz-kicker">Legal</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Terms and Conditions</h1>
        <p className="mt-2 text-sm text-[#596477]">
          Welcome to CampusAid. These Terms and Conditions ("Terms") govern your use of our platform, website, and services.
          By creating an account or using CampusAid, you agree to these Terms. Please also read our{" "}
          <a href="/privacy" className="font-bold underline underline-offset-4">Privacy Policy</a>.
        </p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-[#596477]">
          <section>
            <h2 className="font-bold text-[#172033]">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using the CampusAid website, mobile features, and services (together, the "Service"), you confirm that
              you accept and agree to be bound by these Terms. If you do not agree, you must not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">2. Eligibility & Accounts</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>You must be at least 18 years old (or the age of majority in your jurisdiction) to create an account.</li>
              <li>You must be currently enrolled at a recognised educational institution.</li>
              <li>You may only create and hold one account. Sharing, transferring, or selling accounts is prohibited.</li>
              <li>You are responsible for keeping your credentials safe and for all activity that occurs under your account.</li>
              <li>Notify us immediately if you suspect any unauthorised use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">3. Posting tasks</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Task descriptions must be accurate, complete, and lawful.</li>
              <li>You must set a budget that reasonably reflects the effort required for the work.</li>
              <li>You may not post tasks that require academic dishonesty, cheating, plagiarism, impersonation, exam fraud, or submission of another person's work as your own.</li>
              <li>You may not post tasks that are illegal, harmful, dangerous, discriminatory, adult in nature, or that violate your institution's code of conduct.</li>
              <li>You are responsible for confirming that any work submitted complies with your institution's rules before submission.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">4. Providing work</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Providers must deliver work that meets the agreed description, quality, and deadline.</li>
              <li>Providers must confirm their own availability before accepting a task.</li>
              <li>Work must be original; submitting plagiarised or AI-generated content without explicit permission from the requester and acknowledgement of AI use is prohibited.</li>
              <li>Providers must not share or repurpose a requester's assignment details, files, or personal information outside of the specific task.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">5. Offers, selection & contracts</h2>
            <p className="mt-2">
              Sending an offer does not create a binding agreement. A binding contract between requester and provider is formed only when:
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-6">
              <li>the requester explicitly selects the provider's offer; and</li>
              <li>the full task budget has been funded into the CampusAid wallet.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">6. Payments, wallet & fees</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Funds for a task must be loaded into the CampusAid wallet before work begins.</li>
              <li>CampusAid charges a small platform fee on each completed transaction. The fee is disclosed before you confirm a provider.</li>
              <li>Funds are released to the provider's available balance only after the requester marks the task as completed (or after a reasonable auto-confirm window).</li>
              <li>Withdrawals are processed within 3–5 business days after successful admin review.</li>
              <li>Withdrawal methods and minimum amounts are as listed in the withdrawal screen at the time of request.</li>
              <li>You are solely responsible for any taxes or duties arising from your earnings on the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">7. Refunds, cancellations & disputes</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>You may cancel a posted task before a provider is selected and any funded amount will be returned to your wallet balance.</li>
              <li>If you are not satisfied with the delivery, raise a dispute from the task page before marking the task complete.</li>
              <li>Disputes are reviewed by CampusAid admins based on evidence uploaded by both sides. Admin decisions are final.</li>
              <li>Refund outcomes can include no refund, partial refund, or full refund, depending on the circumstances and evidence provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">8. Ratings & conduct</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Leave honest, factual ratings. Rating manipulation, extortion ("rate 5 stars or I dispute"), or fake reviews are grounds for account termination.</li>
              <li>Users must communicate respectfully. Harassment, hate speech, threats, and discriminatory behaviour are strictly prohibited.</li>
              <li>Do not attempt to transact outside the platform to avoid fees. Doing so forfeits all wallet, dispute, and refund protections.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">9. Content you post</h2>
            <p className="mt-2">
              You retain ownership of content you post on CampusAid. By posting it, you grant CampusAid a non-exclusive, worldwide, royalty-free licence to host, display, transmit, and moderate that content only for the purpose of operating and improving the Service.
            </p>
            <p className="mt-2">
              You are solely responsible for the content you post and confirm that it does not infringe any third party's copyrights, trademarks, or other rights.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">10. Prohibited uses</h2>
            <p className="mt-2">You may not use CampusAid to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Commit fraud, deception, or any illegal act.</li>
              <li>Facilitate academic dishonesty, contract cheating, plagiarism, or exam cheating.</li>
              <li>Distribute malware, spam, phishing, or automated scrapers that abuse the Service.</li>
              <li>Impersonate any person or misrepresent your affiliation with any institution.</li>
              <li>Reverse engineer, copy, or resell the Service or its data without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">11. Account suspension & termination</h2>
            <p className="mt-2">
              We may suspend or permanently ban your account, with or without notice, if you violate these Terms, engage in fraud or abuse, or if required by law. Suspended accounts may forfeit outstanding wallet balances only after a thorough investigation confirms intentional wrongdoing. Otherwise, any remaining withdrawable balance is refunded or made available for withdrawal within a reasonable period after termination.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">12. Disclaimers & limitation of liability</h2>
            <p className="mt-2">
              The Service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied — including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p className="mt-2">
              To the fullest extent permitted by law, CampusAid, its officers, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or reputation loss, arising out of or in connection with your use of the Service. Our total aggregate liability to you for any claim will not exceed the total platform fees CampusAid actually received from you in the 3 months preceding the event giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">13. Relationship of the parties</h2>
            <p className="mt-2">
              CampusAid operates solely as a marketplace platform. No employment, partnership, joint venture, or agency relationship is created between CampusAid and any user, or between any users, solely because of the Service.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">14. Governing law & disputes</h2>
            <p className="mt-2">
              These Terms are governed by the laws of India. Any dispute arising from these Terms will be submitted to the exclusive jurisdiction of the courts located in Delhi, India. Both parties agree to first attempt resolution through good-faith direct negotiation for 30 days before initiating any formal proceedings.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">15. Modifications</h2>
            <p className="mt-2">
              We may update these Terms from time to time. If changes are material, we will notify you via email or an in-app banner at least 7 days before the changes take effect. Your continued use of the Service after the effective date of the updated Terms constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#172033]">16. Contact</h2>
            <p className="mt-2">
              Questions or concerns about these Terms? Email <a href="mailto:support@campusaid.online" className="font-bold underline underline-offset-4 text-[#172033]">support@campusaid.online</a> or message{" "}
              <a href="https://instagram.com/campus.aid" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 text-[#172033]">@campus.aid</a> on Instagram.
            </p>
          </section>
        </div>

        <p className="mt-10 text-center text-xs text-[#596477]">Last updated: {new Date().toLocaleDateString()}</p>
      </section>
    </AppShell>
  );
}
