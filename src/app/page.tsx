"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const tenants = useQuery({ queryKey: ["tenants"], queryFn: api.tenants.list });
  const costs = useQuery({
    queryKey: ["costs", "today"],
    queryFn: () =>
      api.costs.summary({
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
      }),
  });
  const queues = useQuery({ queryKey: ["pipeline"], queryFn: api.pipeline.queues });
  const coverage = useQuery({ queryKey: ["coverage"], queryFn: api.graph.coverage });

  const tenantCount = tenants.data?.length ?? "—";
  const spendToday = costs.data ? `$${costs.data.totalUsd.toFixed(2)}` : "—";
  const maxQueue =
    queues.data?.reduce((m, q) => Math.max(m, q.oldestMessageAgeSec), 0) ?? 0;
  const entitiesCovered = coverage.data?.entitiesCovered ?? "—";

  return (
    <div>
      <header className="mb-6 border-b border-[var(--ft-border)] pb-4">
        <h1 className="font-serif text-2xl">Atlas Ops</h1>
        <p className="text-[var(--ft-mid)]">Internal management console.</p>
      </header>

      <section className="grid grid-cols-4 gap-4">
        <Card label="ACTIVE TENANTS" value={String(tenantCount)} hint="pilot + live" />
        <Card label="LLM SPEND TODAY" value={spendToday} hint="USD across all tenants" />
        <Card label="OUTBOX LAG" value={`${maxQueue}s`} hint="oldest unpublished" />
        <Card
          label="ENTITIES COVERED"
          value={String(entitiesCovered)}
          hint="in shared graph"
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-[11px] uppercase tracking-wider text-[var(--ft-mid)]">
          Queue health
        </h2>
        <div className="border border-[var(--ft-border)] bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--ft-border)] bg-[var(--ft-pink)]/40">
              <tr className="text-left text-[10px] uppercase tracking-wider text-[var(--ft-mid)]">
                <th className="px-3 py-2">Queue</th>
                <th className="px-3 py-2 text-right">Depth</th>
                <th className="px-3 py-2 text-right">Inflight</th>
                <th className="px-3 py-2 text-right">Oldest (s)</th>
              </tr>
            </thead>
            <tbody>
              {queues.data?.map((q) => (
                <tr key={q.queueName} className="border-b border-[var(--ft-border)] last:border-0">
                  <td className="px-3 py-2 font-mono">{q.queueName}</td>
                  <td className="px-3 py-2 text-right">{q.depth}</td>
                  <td className="px-3 py-2 text-right">{q.inflight}</td>
                  <td className="px-3 py-2 text-right">{q.oldestMessageAgeSec}</td>
                </tr>
              ))}
              {!queues.data && (
                <tr>
                  <td className="px-3 py-4 text-[var(--ft-light)]" colSpan={4}>
                    loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="border border-[var(--ft-border)] bg-white p-4">
      <div className="text-[10px] uppercase tracking-wider text-[var(--ft-light)]">{label}</div>
      <div className="mt-1 font-serif text-2xl text-[var(--ft-dark)]">{value}</div>
      <div className="text-[11px] text-[var(--ft-light)]">{hint}</div>
    </div>
  );
}
