export type MemoryTier = "tier1_session" | "tier2_opt_in" | "tier3_continuity";

export type ExperienceMemory = {
  // IMPORTANT: no PHI / no clinical data.
  topicsExplored: string[]; // knowledge categories/topics ids
  servicesViewed: string[]; // service slugs
  personasUsed: string[]; // persona ids
  preferences?: {
    pace?: "gentle" | "moderate" | "advanced";
    style?: "subtle" | "noticeable" | "unsure";
    stage?: "learning" | "considering" | "ready";
  };
  updatedAt: string; // ISO
  version: number;
};

export interface ExperienceMemoryStore {
  tier: MemoryTier;
  enabled: boolean;
  load(): ExperienceMemory;
  save(next: ExperienceMemory): void;
  clear(): void;
}

