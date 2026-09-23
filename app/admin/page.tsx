"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";

type User = { 
  id: string; 
  username: string; 
  email: string; 
  role: "ADMIN" | "STUDENT"; 
  college: string | null;
  rating: number;
  completedTasks: number;
  createdAt: string;
};

type Withdrawal = { 
  id: string; 
  amount: number; 
  method: string; 
  destination: string; 
  status: string; 
  user: { username: string; email: string };
  createdAt: string;
};

type Analytics = { 
  users: number; 
  tasks: number; 
  completed: number; 
  pendingWithdrawals: number; 
  unreadNotifications: number;
  totalEarnings: number;
  activeUsers: number;
};

type DiscountCode = {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [addFundsUserId, setAddFundsUserId] = useState<string | null>(null);
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [newDiscountCode, setNewDiscountCode] = useState({ code: "", discountPercent: 10, maxUses: 100, expiresAt: "" });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [usersResponse, withdrawalsResponse, analyticsResponse, discountsResponse] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/withdrawals"),
        fetch("/api/admin/analytics"),
        fetch("/api/admin/discounts")
      ]);

      if (!usersResponse.ok) {
        throw new Error("Admin access required");
      }

      const usersData = await usersResponse.json();
      const withdrawalsData = await withdrawalsResponse.json();
      const analyticsData = await analyticsResponse.json();
      const discountsData = await discountsResponse.json();

      setUsers(usersData);
      setWithdrawals(withdrawalsData.withdrawals);
      setAnalytics(analyticsData);
      setDiscountCodes(discountsData);
      setError("");
    } catch (reason: any) {
      setError(reason.message);
    } finally {
      setLoading(false);
    }
  }

  async function userAction(userId: string, action: string, amount?: number) {
    setMessage("");
    const body: any = { userId, action };
    if (amount !== undefined) body.amount = amount;
    
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const result = await response.json();
      setMessage(`Action completed: ${action}`);
      await loadData(); // Refresh data
    } else {
      const result = await response.json();
      setMessage(result.error || "Action failed");
    }
  }

  async function settleWithdrawal(id: string, status: string) {
    setMessage("");
    const response = await fetch("/api/admin/withdrawals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });

    if (response.ok) {
      setMessage(`Withdrawal marked as ${status}`);
      await loadData(); // Refresh data
    } else {
      const result = await response.json();
      setMessage(result.error || "Action failed");
    }
  }

  async function createDiscountCode() {
    setMessage("");
    const response = await fetch("/api/admin/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDiscountCode)
    });

    if (response.ok) {
      setMessage("Discount code created successfully");
      setNewDiscountCode({ code: "", discountPercent: 10, maxUses: 100, expiresAt: "" });
      await loadData();
    } else {
      const result = await response.json();
      setMessage(result.error || "Failed to create discount code");
    }
  }

  async function toggleDiscountCode(id: string, isActive: boolean) {
    setMessage("");
    const response = await fetch("/api/admin/discounts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive })
    });

    if (response.ok) {
      setMessage(`Discount code ${isActive ? "activated" : "deactivated"}`);
      await loadData();
    } else {
      const result = await response.json();
      setMessage(result.error || "Failed to update discount code");
    }
  }

  if (loading) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center"><h1 className="text-3xl font-black text-[#172033]">Loading admin console...</h1></section></AppShell>;
  }

  if (error) {
    return <AppShell><section className="liquid-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center"><h1 className="text-3xl font-black text-[#172033]">{error}</h1></section></AppShell>;
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="liquid-panel rounded-[30px] p-6">
          <p className="genz-kicker">Admin console</p>
          <h1 className="mt-3 text-3xl font-black text-[#172033]">Campus operations</h1>
          <p className="mt-2 text-sm text-[#596477]">Manage users, manual payouts, and real product analytics.</p>
          {message && <p className="mt-4 text-sm font-semibold text-emerald-700">{message}</p>}
        </section>

        <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Users", analytics?.users ?? 0],
            ["Tasks", analytics?.tasks ?? 0],
            ["Completed", analytics?.completed ?? 0],
            ["Pending payouts", analytics?.pendingWithdrawals ?? 0],
            ["Active users", analytics?.activeUsers ?? 0],
            ["Total earnings", `₹${analytics?.totalEarnings ?? 0}`]
          ].map(([label, value]) => (
            <div key={label} className="campus-stat">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#596477]">{label}</p>
                <p className="mt-2 text-2xl font-black text-[#172033]">{value}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="liquid-panel rounded-[30px] p-6">
            <h2 className="text-xl font-black text-[#172033]">Users</h2>
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="rounded-2xl bg-white/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-bold text-[#172033]">{user.username}</p>
                      <p className="text-xs text-[#596477]">{user.email}</p>
                      <p className="text-xs text-[#596477]">
                        {user.college ?? "College not added"} · Rating: {user.rating.toFixed(1)} · 
                        Completed: {user.completedTasks}
                      </p>
                      <p className="text-xs text-[#596477]">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        user.role === "ADMIN" ? "bg-[#4968ff] text-white" : "bg-gray-200 text-gray-700"
                      }`}>
                        {user.role}
                      </span>
                      <div className="flex gap-2">
                        {user.role !== "ADMIN" && (
                          <button
                            onClick={() => userAction(user.id, "makeAdmin")}
                            className="text-xs font-black text-[#4968ff] hover:underline"
                          >
                            Make Admin
                          </button>
                        )}
                        {user.role === "ADMIN" && (
                          <button
                            onClick={() => userAction(user.id, "removeAdmin")}
                            className="text-xs font-black text-red-700 hover:underline"
                          >
                            Remove Admin
                          </button>
                        )}
                        <button
                          onClick={() => userAction(user.id, "flagUser")}
                          className="text-xs font-black text-amber-700 hover:underline"
                        >
                          Flag
                        </button>
                        <button
                          onClick={() => userAction(user.id, "logoutUser")}
                          className="text-xs font-black text-red-700 hover:underline"
                        >
                          Logout
                        </button>
                        <button
                          onClick={() => setAddFundsUserId(user.id)}
                          className="text-xs font-black text-emerald-700 hover:underline"
                        >
                          Add Funds
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-panel rounded-[30px] p-6">
            <h2 className="text-xl font-black text-[#172033]">Withdrawal requests</h2>
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {withdrawals.length ? (
                withdrawals.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/60 p-4">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-bold text-[#172033]">{item.user.username} · ₹{item.amount}</p>
                        <p className="text-xs text-[#596477]">{item.user.email}</p>
                        <p className="text-xs text-[#596477]">{item.method} · {item.destination}</p>
                        <p className="text-xs text-[#596477]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          item.status === "PENDING" ? "bg-amber-100 text-amber-800" :
                          item.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                          item.status === "PAID" ? "bg-emerald-100 text-emerald-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {item.status}
                        </span>
                        {item.status === "PENDING" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => settleWithdrawal(item.id, "PROCESSING")}
                              className="text-xs font-black text-blue-700 hover:underline"
                            >
                              Process
                            </button>
                            <button
                              onClick={() => settleWithdrawal(item.id, "PAID")}
                              className="text-xs font-black text-emerald-700 hover:underline"
                            >
                              Settle
                            </button>
                            <button
                              onClick={() => settleWithdrawal(item.id, "REJECTED")}
                              className="text-xs font-black text-red-700 hover:underline"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {item.status === "PROCESSING" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => settleWithdrawal(item.id, "PAID")}
                              className="text-xs font-black text-emerald-700 hover:underline"
                            >
                              Settle
                            </button>
                            <button
                              onClick={() => settleWithdrawal(item.id, "REJECTED")}
                              className="text-xs font-black text-red-700 hover:underline"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-[#596477]">No withdrawal requests pending.</p>
              )}
            </div>
          </div>
        </section>

        <section className="liquid-panel rounded-[30px] p-6">
          <h2 className="text-xl font-black text-[#172033]">Discount Codes</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-white/60 p-4">
              <h3 className="font-bold text-[#172033]">Create New Discount Code</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Code</label>
                  <input
                    type="text"
                    value={newDiscountCode.code}
                    onChange={(e) => setNewDiscountCode({ ...newDiscountCode, code: e.target.value.toUpperCase() })}
                    placeholder="CAMPUS10"
                    className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newDiscountCode.discountPercent}
                    onChange={(e) => setNewDiscountCode({ ...newDiscountCode, discountPercent: Number(e.target.value) })}
                    className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Max Uses</label>
                  <input
                    type="number"
                    min="1"
                    value={newDiscountCode.maxUses}
                    onChange={(e) => setNewDiscountCode({ ...newDiscountCode, maxUses: Number(e.target.value) })}
                    className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Expires (optional)</label>
                  <input
                    type="date"
                    value={newDiscountCode.expiresAt}
                    onChange={(e) => setNewDiscountCode({ ...newDiscountCode, expiresAt: e.target.value })}
                    className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
                  />
                </div>
              </div>
              <button
                onClick={createDiscountCode}
                className="mt-4 genz-button px-5 py-3 text-sm font-black"
              >
                Create Discount Code
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {discountCodes.map((code) => (
                <div key={code.id} className="flex items-center justify-between rounded-2xl bg-white/60 p-4">
                  <div>
                    <p className="font-bold text-[#172033]">{code.code}</p>
                    <p className="text-xs text-[#596477]">
                      {code.discountPercent}% discount · {code.currentUses}/{code.maxUses} uses
                      {code.expiresAt && ` · Expires: ${new Date(code.expiresAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleDiscountCode(code.id, !code.isActive)}
                    className={`text-xs font-black px-3 py-2 rounded-full ${
                      code.isActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {code.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add Funds Modal */}
        {addFundsUserId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="liquid-panel w-full max-w-md rounded-[30px] p-6">
              <h3 className="text-xl font-black text-[#172033]">Add Funds to User Wallet</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#596477]">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={addFundsAmount}
                    onChange={(e) => setAddFundsAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="mt-2 min-h-11 w-full rounded-2xl border border-white/80 bg-white/65 px-3 text-sm outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setAddFundsUserId(null);
                      setAddFundsAmount("");
                    }}
                    className="flex-1 rounded-full border border-[#172033] px-4 py-3 text-sm font-black text-[#172033]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const amount = Number(addFundsAmount);
                      if (amount > 0 && addFundsUserId) {
                        userAction(addFundsUserId, "addFunds", amount);
                        setAddFundsUserId(null);
                        setAddFundsAmount("");
                      }
                    }}
                    className="flex-1 genz-button px-4 py-3 text-sm font-black"
                  >
                    Add Funds
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}