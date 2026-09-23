import { AppShell } from "@/components/site-shell";

const faqItems = [
  {
    q: "What is CampusAid?",
    a: "CampusAid is a student-to-student marketplace where you can post tasks you need help with — assignments, notes, projects, exam prep, and more — or earn money by helping other students.",
  },
  {
    q: "Who can use CampusAid?",
    a: "Any student currently enrolled at a recognised college or university may use CampusAid. You must be at least 18 years old (or the age of majority in your jurisdiction) to create an account.",
  },
  {
    q: "How do I post a task?",
    a: "Click 'Post a Task' in the navigation, answer a few simple questions about what you need, set a fair budget and deadline, then publish it. Other students will be able to send you offers.",
  },
  {
    q: "How do payments and wallet work?",
    a: "When you select a provider, you pay the task budget into your CampusAid wallet. The amount stays there until the work is marked complete, then it's released to the provider's available balance. Withdrawals are processed within 3–5 business days after admin approval.",
  },
  {
    q: "Is there a service fee?",
    a: "Yes. CampusAid charges a small platform fee on completed transactions. The exact fee is shown clearly before you confirm a provider. Fees help us keep the platform secure and run support and dispute resolution.",
  },
  {
    q: "What if the work isn't delivered properly?",
    a: "You can raise a dispute from the task page. Explain the issue, upload evidence, and our admin team will mediate between you and the provider. Outcomes may include partial refund, full refund, or rework.",
  },
  {
    q: "Can I cancel a task after posting it?",
    a: "You can cancel a task before a provider has been selected at no cost. After a provider is selected, you can request cancellation through the dispute flow.",
  },
  {
    q: "How do ratings work?",
    a: "After a task is completed, the requester rates the provider (1–5 stars) with an optional review. Your average rating is displayed on your profile and helps other students decide to work with you.",
  },
  {
    q: "Is my personal information safe?",
    a: "We take data protection seriously. Passwords are securely hashed, sessions are signed and stored on secure cookies, and we never store only the information strictly needed to run the service. See our Privacy Policy for full details.",
  },
  {
    q: "I forgot my password. What now?",
    a: "Use the 'Forgot password' option on the login page (coming soon). Until then, reach out to us at support@campusaid.online or DM us on Instagram @campus.aid and we will help you reset it.",
  },
  {
    q: "Can I change my username or email?",
    a: "Email changes can be requested via support. For security reasons we don't allow automated username changes yet — but if you need one, DM us and we'll help.",
  },
  {
    q: "Someone is behaving inappropriately — how do I report them?",
    a: "Message us through Instagram @campus.aid, use the Contact page, or flag a task via the dispute flow. We review every report within 24 hours and take action including account including warnings and account bans as needed.",
  },
];

export default function FaqPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8">
        <p className="genz-kicker">Help center</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Frequently asked questions</h1>
        <p className="mt-2 text-sm text-[#596477]">
          Everything you need to know about posting tasks, getting paid, and staying safe on CampusAid.
        </p>

        <div className="mt-8 divide-y divide-zinc-200">
          {faqItems.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h2 className="text-base font-bold text-[#172033]">{item.q}</h2>
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-zinc-100 text-lg font-light text-zinc-600 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#596477]">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white/60 p-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#596477]">Still have questions?</h3>
          <p className="mt-2 text-sm text-[#172033]">
            Reach out via our <a href="/contact" className="font-bold underline underline-offset-4">Contact page</a> or DM <a href="https://instagram.com/campus.aid" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">@campus.aid</a> on Instagram — we answer within a business day.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#596477]">Last updated: {new Date().toLocaleDateString()}</p>
      </section>
    </AppShell>
  );
}
