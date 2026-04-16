"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function TenantsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tenants"],
    queryFn: api.tenants.list,
  });

  return (
    <div>
      <header className="mb-6 border-b border-[var(--ft-border)] pb-4">
        <h1 className="font-serif text-2xl">Tenants</h1>
        <p className="text-[var(--ft-mid)]">Customer firms using Atlas.</p>
      </header>

      {error && <div className="text-[var(--ft-down)]">Error: {String(error)}</div>}

      <div className="border border-[var(--ft-border)] bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--ft-border)] bg-[var(--ft-pink)]/40">
            <tr className="text-left text-[10px] uppercase tracking-wider text-[var(--ft-mid)]">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Tier</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">RMs</th>
              <th className="px-3 py-2 text-right">Budget</th>
              <th className="px-3 py-2 text-right">MTD Spend</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="px-3 py-4 text-[var(--ft-light)]" colSpan={7}>
                  loading…
                </td>
              </tr>
            )}
            {data?.map((t) => (
              <tr key={t.id} className="border-b border-[var(--ft-border)] last:border-0">
                <td className="px-3 py-2 font-medium">{t.name}</td>
                <td className="px-3 py-2 font-mono text-[var(--ft-mid)]">{t.slug}</td>
                <td className="px-3 py-2">{t.tier}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      t.status === "active"
                        ? "text-[var(--ft-up)]"
                        : "text-[var(--ft-down)]"
                    }
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{t.rmCount}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  ${t.activeBudgetUsd.toFixed(0)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  ${t.spendMtdUsd.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
