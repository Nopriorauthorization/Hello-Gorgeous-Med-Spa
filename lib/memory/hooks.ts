"use client";

import React from "react";

import { getSessionMemoryStore, type ExperienceMemory } from "./index";

function uniquePush(arr: string[], value: string, limit = 24) {
  const v = (value || "").trim();
  if (!v) return arr;
  const next = arr.filter((x) => x !== v);
  next.unshift(v);
  return next.slice(0, limit);
}

export function useExperienceMemory() {
  const store = React.useMemo(() => getSessionMemoryStore(), []);
  const [mem, setMem] = React.useState<ExperienceMemory>(() => store.load());

  React.useEffect(() => {
    store.save(mem);
  }, [mem, store]);

  const actions = React.useMemo(
    () => ({
      trackTopic(topicId: string) {
        setMem((m) => ({ ...m, topicsExplored: uniquePush(m.topicsExplored, topicId) }));
      },
      trackService(serviceSlug: string) {
        setMem((m) => ({ ...m, servicesViewed: uniquePush(m.servicesViewed, serviceSlug) }));
      },
      trackPersona(personaId: string) {
        setMem((m) => ({ ...m, personasUsed: uniquePush(m.personasUsed, personaId) }));
      },
      setPreference(next: Partial<NonNullable<ExperienceMemory["preferences"]>>) {
        setMem((m) => ({ ...m, preferences: { ...(m.preferences ?? {}), ...next } }));
      },
      clear() {
        store.clear();
        setMem(store.load());
      },
    }),
    [store],
  );

  return { mem, ...actions };
}

