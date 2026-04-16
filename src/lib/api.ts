/**
 * Typed client to atlas-backend /ops/* endpoints.
 * All calls gated server-side to role=atlas_admin.
 */
const BASE = "/api/ops";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`atlas-ops ${path}: ${res.status} ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  tenants: {
    list: () => req<Tenant[]>("/tenants"),
    get: (id: string) => req<Tenant>(`/tenants/${id}`),
  },
  costs: {
    summary: (params: { from: string; to: string }) =>
      req<CostSummary>(`/costs/summary?from=${params.from}&to=${params.to}`),
    ledger: (params: { tenantId?: string; limit?: number }) =>
      req<LLMLedgerEntry[]>(
        `/costs/ledger?${new URLSearchParams(params as Record<string, string>)}`
      ),
  },
  scrapers: {
    templates: () => req<ScraperTemplate[]>("/scrapers/templates"),
    instances: () => req<ScraperInstance[]>("/scrapers/instances"),
    runs: (instanceId: string) =>
      req<ScraperRun[]>(`/scrapers/instances/${instanceId}/runs`),
  },
  prompts: {
    list: () => req<PromptTemplate[]>("/prompts"),
    versions: (name: string) => req<PromptTemplate[]>(`/prompts/${name}/versions`),
  },
  graph: {
    coverage: () => req<GraphCoverage>("/graph/coverage"),
    qaQueue: () => req<GraphQaItem[]>("/graph/qa"),
  },
  pipeline: {
    queues: () => req<PipelineHealth>("/pipeline/queues"),
    outboxLag: () => req<OutboxLag>("/pipeline/outbox"),
  },
};

// --- Types (will be generated from OpenAPI once backend exposes schema) ---
export interface Tenant {
  id: string;
  name: string;
  tier: string;
  rmCount: number;
  activeBudgetUsd: number;
  spendMtdUsd: number;
}

export interface CostSummary {
  totalUsd: number;
  byTenant: { tenantId: string; name: string; usd: number }[];
  byModel: { model: string; usd: number; tokensIn: number; tokensOut: number }[];
  byModule: { module: string; usd: number }[];
}

export interface LLMLedgerEntry {
  callId: string;
  ts: string;
  tenantId: string;
  userId: string | null;
  module: string;
  purpose: string;
  provider: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
  tokensCached: number;
  costUsd: number;
  outcome: string;
}

export interface ScraperTemplate {
  templateId: string;
  name: string;
  sourceKind: string;
  version: number;
}

export interface ScraperInstance {
  instanceId: string;
  templateId: string;
  tenantId: string | null;
  active: boolean;
  lastRunAt: string | null;
}

export interface ScraperRun {
  runId: string;
  startedAt: string;
  finishedAt: string | null;
  recordsFetched: number;
  outcome: string;
}

export interface PromptTemplate {
  templateId: string;
  name: string;
  version: number;
  activatedAt: string | null;
  deprecatedAt: string | null;
}

export interface GraphCoverage {
  entitiesKnown: number;
  entitiesCovered: number;
  byTier: { tier: string; count: number }[];
}

export interface GraphQaItem {
  edgeId: string;
  fromLabel: string;
  toLabel: string;
  relationship: string;
  confidence: number;
  flaggedBy: string | null;
}

export interface PipelineHealth {
  queue: string;
  depth: number;
  inflight: number;
  oldestMessageAgeSec: number;
}

export interface OutboxLag {
  eventType: string;
  unpublishedCount: number;
  oldestUnpublishedSec: number;
}
