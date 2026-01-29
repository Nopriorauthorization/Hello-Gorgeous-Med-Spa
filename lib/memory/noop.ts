import type { ExperienceMemory, ExperienceMemoryStore, MemoryTier } from "./types";

function nowIso() {
  return new Date().toISOString();
}

export function createNoopStore(tier: MemoryTier): ExperienceMemoryStore {
  return {
    tier,
    enabled: false,
    load(): ExperienceMemory {
      return {
        topicsExplored: [],
        servicesViewed: [],
        personasUsed: [],
        preferences: { stage: "learning" },
        updatedAt: nowIso(),
        version: 1,
      };
    },
    save() {
      // intentionally no-op
    },
    clear() {
      // intentionally no-op
    },
  };
}

