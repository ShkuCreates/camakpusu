import { AppShell } from "@/components/site-shell";

export default function TermsPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8">
        <p className="genz-kicker">Legal</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Terms and Conditions</h1>
        
        <div className="mt-8 space-y-6 text-sm text-[#596477]">
          <section>
            <h2 className="font-bold text-[#172033]">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using CampusAid, you agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">2. User Responsibilities</h2>
            <p className="mt-2">
              Users must be at least 18 years old and enrolled in a recognized educational institution. 
              You are responsible for maintaining the confidentiality of your account information and for all activities 
              that occur under your account.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">3. Task Posting and Completion</h2>
            <p className="mt-2">
              Task posters must provide accurate descriptions and fair compensation. Task providers must deliver 
              quality work within agreed timelines. Both parties must communicate professionally and respect deadlines.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">4. Payments and Transactions</h2>
            <p className="mt-2">
              All payments are processed through our secure wallet system. CampusAid charges a small service fee 
              on transactions. Withdrawals are processed within 3-5 business days, subject to admin approval.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">5. Prohibited Activities</h2>
            <p className="mt-2">
              Users may not post illegal, harmful, or inappropriate content. Academic dishonesty, plagiarism, 
              and fraud are strictly prohibited. Violations may result in account termination.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">6. Privacy and Data Protection</h2>
            <p className="mt-2">
              We collect and use your data as described in our Privacy Policy. We implement appropriate security 
              measures to protect your personal information.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">7. Dispute Resolution</h2>
            <p className="mt-2">
              In case of disputes between users, CampusAid provides a mediation process. Admin decisions are 
              final and binding. Users agree to cooperate in good faith during dispute resolution.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">8. Limitation of Liability</h2>
            <p className="mt-2">
              CampusAid is not liable for any damages arising from the use of our platform. We provide the service 
              "as is" without warranties of any kind.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">9. Modifications to Terms</h2>
            <p className="mt-2">
              We reserve the right to modify these terms at any time. Continued use of the platform constitutes 
              acceptance of updated terms.
            </p>
          </section>
          
          <section>
            <h2 className="font-bold text-[#172033]">10. Contact Information</h2>
            <p className="mt-2">
              For questions about these terms, please contact us at support@campusaid.com or through our 
              Instagram @campus.aid
            </p>
          </section>
        </div>
        
        <div className="mt-8 rounded-2xl bg-white/60 p-4 text-center">
          <p className="text-sm text-[#596477]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </AppShell>
  );
}