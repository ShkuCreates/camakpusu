import { AppShell } from "@/components/site-shell";

export default function ContactPage() {
  return (
    <AppShell>
      <section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8">
        <p className="genz-kicker">Contact Us</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Get in Touch</h1>
        <p className="mt-4 text-sm text-[#596477]">
          Have questions or need help? Reach out to us and we'll get back to you as soon as possible.
        </p>
        
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="font-bold text-[#172033]">Email</h3>
            <p className="text-sm text-[#596477]">support@campusaid.com</p>
          </div>
          
          <div>
            <h3 className="font-bold text-[#172033]">Instagram</h3>
            <a 
              href="https://instagram.com/campus.aid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#4968ff] hover:underline"
            >
              @campus.aid
            </a>
          </div>
          
          <div>
            <h3 className="font-bold text-[#172033]">Location</h3>
            <p className="text-sm text-[#596477]">Delhi NCR, India</p>
          </div>
        </div>
        
        <div className="mt-8 rounded-2xl bg-white/60 p-6">
          <h3 className="font-bold text-[#172033]">Send us a message</h3>
          <form className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Name</label>
              <input 
                type="text" 
                placeholder="Your name" 
                className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Message</label>
              <textarea 
                placeholder="How can we help you?" 
                className="mt-2 min-h-24 w-full rounded-2xl border border-white/80 bg-white/65 px-3 py-3 text-sm text-[#596477] outline-none resize-none" 
              />
            </div>
            <button className="genz-button px-5 py-3 text-sm font-black">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}