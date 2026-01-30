// Mascot metadata for /meet-the-team
export type Mascot = {
  id: string;
  name: string;
  video: string;
  personality: string;
  service: string;
  accentColor?: string;
};

export const mascots: Mascot[] = [
  {
    id: 'beau-tox',
    name: 'Beau-Tox',
    video: '/mascots/beau-tox.mp4',
    personality: 'Confident, witty, and sharp. Loves smooth results.',
    service: 'Botox / Neurotoxins',
    accentColor: '#FF1B8D', // Hot pink
  },
  {
    id: 'filla-grace',
    name: 'Filla Grace',
    video: '/mascots/filla-grace.mp4',
    personality: 'Graceful, uplifting, and always glowing.',
    service: 'Dermal Fillers',
    accentColor: '#FF1B8D',
  },
  {
    id: 'peppi',
    name: 'Peppi',
    video: '/mascots/peppi.mp4',
    personality: 'Energetic, playful, and full of pep.',
    service: 'Medical Weight Loss',
    accentColor: '#FF1B8D',
  },
  {
    id: 'founder',
    name: 'The Founder',
    video: '/mascots/founder.mp4',
    personality: 'Visionary, welcoming, and always in control.',
    service: 'Leadership / Concierge',
    accentColor: '#FF1B8D',
  },
  // Add more mascots as needed
];
