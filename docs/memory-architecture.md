# Phase 2 Memory & Personalization (Design Only) — DEV TICKET #014

## Non‑negotiables

- **No PHI** (no diagnoses, labs, medications, health history, prescriptions).
- **Transparent + user controlled**.
- **Optional** (tier 2+ requires explicit consent).
- **Feature‑flagged** (no hard dependencies).

## Memory tiers

### Tier 1 — Session memory (active now)

Stores (session only):
- topics explored
- services viewed (slugs)
- personas used
- non‑clinical preferences (pace/style/stage)

Clears on session end. No identity. Uses `sessionStorage`.

### Tier 2 — Opt‑in experience memory (Phase 2)

User explicitly consents. Stores:
- education preferences
- comfort level
- interest areas
- past questions (non‑clinical wording only)
- “learning vs ready”

Does NOT store:
- diagnoses
- labs
- meds
- health history

### Tier 3 — Continuity memory (future)

Optional future alignment. Still **not clinical data**.

## Implementation scaffold (current code)

- `lib/memory/types.ts`: `ExperienceMemory` + store interface
- `lib/memory/session.ts`: tier 1 session store (active)
- `lib/memory/noop.ts`: placeholder stores for tier 2/3 (inactive)
- `lib/memory/hooks.ts`: `useExperienceMemory()` hook
- `lib/memory/flags.ts`: feature flags

## How personalization will work later (without PHI)

Examples (safe):
- “Last time you explored skin health—want to continue?”
- “You tend to prefer gentle, subtle options.”
- “Many people at this stage like to learn before booking.”

## How to add opt‑in memory later (Phase 2)

1. Add a consent UI (clear language + toggle).
2. Implement a real `ExperienceMemoryStore` for tier 2 behind `NEXT_PUBLIC_OPT_IN_MEMORY=1`.
3. Add “View memory / Clear memory / Opt out” UI.

