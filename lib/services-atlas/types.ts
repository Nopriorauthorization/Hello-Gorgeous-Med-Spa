import type { PersonaId } from "@/lib/personas/types";

export type IntensityLevel = "Gentle" | "Moderate" | "Advanced";
export type CommitmentLevel = "One-time" | "Maintenance" | "Program-based";

export type ServiceAtlasClusterId =
  | "aesthetics-injectables"
  | "weight-loss-metabolic-care"
  | "hormones-wellness"
  | "skin-regeneration"
  | "iv-therapy-recovery"
  | "hair-restoration"
  | "pain-recovery"
  | "lashes-brows-beauty"
  | "medical-visits-consultations";

export type ServiceAtlasCluster = {
  id: ServiceAtlasClusterId;
  title: string;
  description: string;
  personaDefault: PersonaId;
  serviceSlugs: string[];
};

export type ServiceAtlasCard = {
  slug: string; // must match `/services/[slug]`
  name: string;
  plainLanguage: string;
  commonlyHelpsWith: string[];
  oftenFor: string[];
  mayNotBeFor: string[];
  intensity: IntensityLevel;
  commitment: CommitmentLevel;
  defaultPersona: PersonaId;
};

export type DiscoveryOptionId =
  | "confidence-aesthetics"
  | "weight-loss"
  | "hormones-energy"
  | "skin-health"
  | "hair-restoration"
  | "pain-recovery"
  | "iv-wellness"
  | "lashes-brows-beauty"
  | "not-sure";

export type DiscoveryOption = {
  id: DiscoveryOptionId;
  label: string;
  description: string;
  clusters: ServiceAtlasClusterId[];
  personaHandOff: PersonaId;
  whyThisExists: string;
};

