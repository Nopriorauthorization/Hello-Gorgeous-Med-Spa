export const SESSION_MEMORY_ENABLED = true;

// Phase 2+ flags (design only; storage remains inactive unless explicitly enabled)
export const OPT_IN_MEMORY_ENABLED = process.env.NEXT_PUBLIC_OPT_IN_MEMORY === "1";
export const CONTINUITY_MEMORY_ENABLED = process.env.NEXT_PUBLIC_CONTINUITY_MEMORY === "1";

