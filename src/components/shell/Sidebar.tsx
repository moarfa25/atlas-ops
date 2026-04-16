"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/tenants", label: "Tenants" },
  { href: "/costs", label: "LLM Costs" },
  { href: "/scrapers", label: "Scrapers" },
  { href: "/prompts", label: "Prompts" },
  { href: "/graph", label: "Graph QA" },
  { href: "/overlays", label: "Overlays" },
  { href: "/pipeline", label: "Pipeline Health" },
  { href: "/news", label: "News Moderation" },
  { href: "/audit", label: "Audit Log" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="w-56 border-r border-[var(--ft-border)] bg-[var(--ft-navy)] text-[var(--ft-cream)]">
      <div className="border-b border-[var(--ft-border)]/20 p-4">
        <div className="font-serif text-lg">ATLAS</div>
        <div className="text-[10px] uppercase tracking-widest text-[var(--ft-gold)]">
          Ops Console
        </div>
      </div>
      <ul className="py-2">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "block px-4 py-2 text-[11px] uppercase tracking-wider",
                  active
                    ? "border-l-2 border-[var(--ft-gold)] bg-white/5"
                    : "text-[#9B9B8F] hover:text-[var(--ft-cream)]"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
