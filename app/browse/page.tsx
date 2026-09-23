"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { TaskCard } from "@/components/task-card";
import { categoryOptions, collegeOptions, localityOptions } from "@/lib/college-data";
import { MarketplaceTask, recommendationFilters } from "@/lib/types";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Recommended");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [locality, setLocality] = useState("All localities");
  const [selectedCollege, setSelectedCollege] = useState("All colleges");
  const [collegeSearch, setCollegeSearch] = useState("");
  const [delivery, setDelivery] = useState("All");
  const [tasks, setTasks] = useState<MarketplaceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load tasks");
        return response.json();
      })
      .then((data: MarketplaceTask[]) => setTasks(data))
      .catch(() => {
        setTasks([]);
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        query.length === 0 ||
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.locality.toLowerCase().includes(query) ||
        task.requester.toLowerCase().includes(query) ||
        task.college?.toLowerCase().includes(query) === true;

      const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
      const matchesLocality = locality === "All localities" || task.locality === locality;
      const matchesCollege = selectedCollege === "All colleges" || task.college === selectedCollege;
      const matchesDelivery = delivery === "All" || task.format === delivery;

      const matchesFilter =
        selectedFilter === "Recommended" ||
        (selectedFilter === "Newest" && (task.posted.includes("h") || task.posted.includes("d"))) ||
        (selectedFilter === "Urgent" && task.urgency === "Urgent") ||
        (selectedFilter === "Nearby" && locality !== "All localities" && task.locality === locality);

      return matchesSearch && matchesCategory && matchesLocality && matchesCollege && matchesDelivery && matchesFilter;
    });
  }, [delivery, locality, search, selectedCategory, selectedCollege, selectedFilter, tasks]);

  const visibleColleges = collegeOptions.filter((college) => {
    const query = collegeSearch.trim().toLowerCase();
    return !query || `${college.name} ${college.group}`.toLowerCase().includes(query);
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-zinc-200/80 bg-white/60 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl md:flex-row md:items-end md:justify-between">
          <div>
            <p className="genz-kicker">Marketplace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Browse tasks nearby</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {recommendationFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={filter === selectedFilter ? "min-h-11 rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-white" : "min-h-11 rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-xs font-medium text-zinc-700"}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded-[26px] border border-zinc-200/80 bg-white/70 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, category, location, skill or college"
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 outline-none"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="glass-panel rounded-3xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Filters</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm text-zinc-700 outline-none"
                >
                  <option value="All">All categories</option>
                  {categoryOptions.map((category) => <option key={category}>{category}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Locality</label>
                <select
                  value={locality}
                  onChange={(event) => setLocality(event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm text-zinc-700 outline-none"
                >
                  <option>All localities</option>
                  {localityOptions.map((place) => <option key={place}>{place}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">College</label>
                <input
                  value={collegeSearch}
                  onChange={(event) => setCollegeSearch(event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm text-zinc-700 outline-none"
                  placeholder="Search your college"
                />
                <div className="mt-2 max-h-44 space-y-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]">
                  <button
                    type="button"
                    onClick={() => setSelectedCollege("All colleges")}
                    className={`flex min-h-11 w-full items-center rounded-xl px-2 py-2 text-left text-xs font-semibold ${selectedCollege === "All colleges" ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-white"}`}
                  >
                    All colleges
                  </button>
                  {visibleColleges.map((college) => (
                    <button
                      key={college.name}
                      type="button"
                      onClick={() => setSelectedCollege(college.name)}
                      className={`flex min-h-11 w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold ${selectedCollege === college.name ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-white"}`}
                    >
                      <img src={`https://www.google.com/s2/favicons?domain=${college.domain}&sz=32`} alt="" className="h-5 w-5 rounded-full bg-white" />
                      <span className="min-w-0 truncate">{college.name}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] leading-4 text-zinc-500">College marks use Google’s favicon service.</p>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Delivery</label>
                <div className="mt-2 flex gap-2">
                  {[
                    ["All", "All"],
                    ["Digital", "Digital"],
                    ["Physical", "Physical"],
                  ].map(([label, value]) => (
                    <button
                      key={value}
                      onClick={() => setDelivery(value)}
                      className={delivery === value ? "min-h-11 rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-white" : "min-h-11 rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-xs font-medium text-zinc-700"}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            {loading ? (
              <div className="liquid-panel rounded-[28px] p-10 text-center text-sm text-zinc-600">Loading live tasks...</div>
            ) : loadError ? (
              <div className="liquid-panel rounded-[28px] border-red-200/70 p-10 text-center">
                <h3 className="text-xl font-semibold text-zinc-900">Marketplace unavailable</h3>
                <p className="mt-2 text-sm text-zinc-600">The task service could not be reached. Check the database connection and try again.</p>
                <button onClick={() => window.location.reload()} className="mt-5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Retry</button>
              </div>
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <div className="liquid-panel rounded-[28px] p-10 text-center">
                <h3 className="text-xl font-semibold text-zinc-900">No live tasks yet.</h3>
                <p className="mt-2 text-sm text-zinc-600">Post the first request or adjust your filters.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/post-task" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
            Post a task
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
