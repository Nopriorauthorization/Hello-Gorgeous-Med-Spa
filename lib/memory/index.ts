import { CONTINUITY_MEMORY_ENABLED, OPT_IN_MEMORY_ENABLED } from "./flags";
import { createNoopStore } from "./noop";
import { createSessionMemoryStore } from "./session";
import type { ExperienceMemoryStore } from "./types";

export type { ExperienceMemory, ExperienceMemoryStore, MemoryTier } from "./types";
export { SESSION_MEMORY_ENABLED, OPT_IN_MEMORY_ENABLED, CONTINUITY_MEMORY_ENABLED } from "./flags";

// Phase 1: always available (session-only)
export function getSessionMemoryStore(): ExperienceMemoryStore {
  return createSessionMemoryStore();
}

// Phase 2 scaffolding (inactive unless explicitly enabled)
export function getOptInMemoryStore(): ExperienceMemoryStore {
  return OPT_IN_MEMORY_ENABLED ? createNoopStore("tier2_opt_in") : createNoopStore("tier2_opt_in");
}

// Phase 3 scaffolding (inactive unless explicitly enabled)
export function getContinuityMemoryStore(): ExperienceMemoryStore {
  return CONTINUITY_MEMORY_ENABLED ? createNoopStore("tier3_continuity") : createNoopStore("tier3_continuity");
}

