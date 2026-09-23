"use client";

import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";

export default function WithdrawPage() {
  const [available, setAvailable] = useState(0);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    fetch("/api/wallet")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setAvailable(data.available);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    
    const withdrawalAmount = Number(amount);
    if (withdrawalAmount < 500) {
      setMessage("Minimum withdrawal is ₹500");
      return;
    }
    if (withdrawalAmount > available) {
      setMessage("Insufficient balance");
      return;
    }
    
    const response = await fetch("/api/withdrawals", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ amount: withdrawalAmount, method, destination }) 
    });
    const result = await response.json();
    if (response.ok) {
      setMessage("Request sent to admin for manual settlement.");
      setAmount("");
      setDestination("");
    } else {
      setMessage(result.error || "Failed to submit withdrawal request");
    }
  }
  
  if (loading) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">Loading...</section></AppShell>;
  }
  
  return (
    <AppShell>
      <form onSubmit={submit} className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-6 md:p-8">
        <p className="genz-kicker">Withdraw</p>
        <h1 className="mt-3 text-3xl font-black text-[#172033]">Request a payout</h1>
        
        <div className="mt-6 rounded-2xl bg-white/60 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">Available to withdraw</p>
          <p className="mt-2 text-3xl font-black text-[#172033]">₹{available}</p>
          {available < 500 && (
            <p className="mt-2 text-sm text-amber-700">Minimum withdrawal is ₹500</p>
          )}
        </div>
        
        <div className="mt-6 space-y-4">
          <input 
            required 
            type="number" 
            min="500" 
            max={available}
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder={`Amount (minimum ₹500, maximum ₹${available})`}
            className="min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none" 
          />
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)} 
            className="min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
          >
            <option>UPI</option>
            <option>Bank account</option>
          </select>
          <input 
            required 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            placeholder={method === "UPI" ? "yourname@upi" : "Account details"} 
            className="min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none" 
          />
          <button 
            disabled={available < 500}
            className="genz-button px-5 py-3 text-sm font-black disabled:opacity-50"
          >
            Send withdrawal request
          </button>
          {message && <p className={`text-sm font-semibold ${message.includes("Failed") || message.includes("Minimum") || message.includes("Insufficient") ? "text-red-700" : "text-emerald-700"}`}>{message}</p>}
        </div>
      </form>
    </AppShell>
  );
}
