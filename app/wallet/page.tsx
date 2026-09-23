"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";

type WalletData = { 
  available: number; 
  pending: number; 
  earned: number; 
  withdrawn: number; 
  entries: { id: string; amount: number; reason: string; status: string; createdAt: string }[];
  allTransactions: { id: string; amount: number; reason: string; status: string; type: string; createdAt: string }[];
};

export default function WalletPage() {
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    fetch("/api/wallet")
      .then((response) => response.ok ? response.json() : null)
      .then((walletData) => {
        setData(walletData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  if (loading) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center">Loading your wallet...</section></AppShell>;
  }
  
  if (!data) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center"><h1 className="text-3xl font-black text-[#172033]">Sign in to view your wallet</h1><Link href="/login" className="mt-6 inline-flex rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white">Sign in</Link></section></AppShell>;
  }
  
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="grid gap-3 sm:grid-cols-4">
          {[
            ["Available", data.available, "text-emerald-700"],
            ["Pending", data.pending, "text-amber-700"],
            ["Earned", data.earned, "text-blue-700"],
            ["Withdrawn", data.withdrawn, "text-red-700"]
          ].map(([label, value, colorClass]) => (
            <div key={label} className="campus-stat">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">{label}</p>
                <p className={`mt-2 text-2xl font-black ${colorClass}`}>₹{value}</p>
              </div>
            </div>
          ))}
        </section>
        
        <section className="liquid-panel rounded-[30px] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="genz-kicker">Wallet</p>
              <h1 className="mt-2 text-2xl font-black text-[#172033]">Transaction history</h1>
            </div>
            {data.available >= 500 && (
              <Link href="/withdraw" className="genz-button px-4 py-3 text-sm font-black">
                Withdraw
              </Link>
            )}
          </div>
          
          <div className="mt-6 space-y-3">
            {data.allTransactions.length ? (
              data.allTransactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/60 p-4">
                  <div>
                    <p className="font-bold text-[#172033]">{transaction.reason}</p>
                    <p className="text-xs text-[#596477]">
                      {transaction.status} · {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`font-black ${transaction.amount > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-[#596477]">
                Complete confirmed work to see earnings here.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
