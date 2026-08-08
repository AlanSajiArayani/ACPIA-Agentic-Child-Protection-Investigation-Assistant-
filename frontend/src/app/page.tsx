import React from 'react';

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-8">
      {/* Header & Mission Banner */}
      <header className="mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              ACPIA — Investigation Workspace
            </h1>
            <p className="text-sm text-slate-400">
              Agentic Child Protection Investigation Assistant (Synthetic Evidence Mode)
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
            Synthetic Data Only
          </span>
        </div>
      </header>

      {/* Autonomous Control Loop Status Banner */}
      <section className="mb-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Autonomous Control Loop Lifecycle
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8 text-center text-xs">
          {['Observe', 'Plan', 'Delegate', 'Execute Tools', 'Observe Results', 'Correlate', 'Verify', 'Human Review'].map((step, idx) => (
            <div key={step} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <span className="block font-bold text-slate-500">{idx + 1}</span>
              <span className="font-medium text-slate-300">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Active Cases & Agent Execution Tree */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-base font-semibold text-white">Agent Execution Tree</h3>
          <p className="mt-1 text-xs text-slate-400">Live multi-agent decision steps & tool invocations</p>
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-800 bg-slate-950/50 text-xs text-slate-500">
            Execution Tree Component (Placeholder)
          </div>
        </div>

        {/* Middle Column: Entity Correlation Graph */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-base font-semibold text-white">Entity Link Graph</h3>
          <p className="mt-1 text-xs text-slate-400">Neo4j synthetic relationship correlation map</p>
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-800 bg-slate-950/50 text-xs text-slate-500">
            Interactive Neo4j Graph Component (Placeholder)
          </div>
        </div>

        {/* Right Column: Human Gate & Audit Log */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-base font-semibold text-white">Human Approval Gate</h3>
          <p className="mt-1 text-xs text-slate-400">Investigator sign-off & checkpoint authorizations</p>
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-800 bg-slate-950/50 text-xs text-slate-500">
            Human Review Authorization Modal (Placeholder)
          </div>
        </div>
      </div>
    </main>
  );
}
