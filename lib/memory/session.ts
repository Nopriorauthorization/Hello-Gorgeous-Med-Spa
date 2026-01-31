import { SESSION_MEMORY_ENABLED } from "./flags";
import type { ExperienceMemory, ExperienceMemoryStore } from "./types";

const KEY = "hg.experience.session.v1";

function nowIso() {
  return new Date().toISOString();
}

function empty(): ExperienceMemory {
  return {
    topicsExplored: [],
    servicesViewed: [],
    personasUsed: [],
    preferences: { stage: "learning" },
    updatedAt: nowIso(),
    version: 1,
  };
}

export function createSessionMemoryStore(): ExperienceMemoryStore {
  return {
    tier: "tier1_session",
    enabled: SESSION_MEMORY_ENABLED,
    load() {
      if (!SESSION_MEMORY_ENABLED) return empty();
      if (typeof window === "undefined") return empty();
      const raw = window.sessionStorage.getItem(KEY);
      if (!raw) return empty();
      try {
        return JSON.parse(raw) as ExperienceMemory;
      } catch {
        return empty();
      }
    },
    save(next) {
      if (!SESSION_MEMORY_ENABLED) return;
      if (typeof window === "undefined") return;
      try {
        const value: ExperienceMemory = { ...next, updatedAt: nowIso(), version: next.version ?? 1 };
        window.sessionStorage.setItem(KEY, JSON.stringify(value));
      } catch {
        // ignore
      }
    },
    clear() {
      if (!SESSION_MEMORY_ENABLED) return;
      if (typeof window === "undefined") return;
      try {
        window.sessionStorage.removeItem(KEY);
      } catch {
        // ignore
      }
    },
  };
}

