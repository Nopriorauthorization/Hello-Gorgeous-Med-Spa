export interface Mascot {
  id: string;
  name: string;
  displayName: string;
  description: string;
  videoFile: string;
  thumbnailFile?: string;
}

export const mascots: Mascot[] = [
  {
    id: 'beau-tox',
    name: 'beau-tox',
    displayName: 'Beau-Tox',
    description: 'Your friendly Botox specialist mascot',
    videoFile: '/video/mascots/beau-tox.mp4',
    thumbnailFile: '/video/mascots/beau-tox-thumb.jpg',
  },
  {
    id: 'filla-grace',
    name: 'filla-grace',
    displayName: 'Filla Grace',
    description: 'The graceful filler expert',
    videoFile: '/video/mascots/filla-grace.mp4',
    thumbnailFile: '/video/mascots/filla-grace-thumb.jpg',
  },
  {
    id: 'founder',
    name: 'founder',
    displayName: 'The Founder',
    description: 'Meet our visionary founder',
    videoFile: '/video/mascots/founder.mp4',
    thumbnailFile: '/video/mascots/founder-thumb.jpg',
  },
  {
    id: 'ryan',
    name: 'ryan',
    displayName: 'Ryan',
    description: 'Your skincare consultant',
    videoFile: '/video/mascots/ryan.mp4',
    thumbnailFile: '/video/mascots/ryan-thumb.jpg',
  },
  {
    id: 'peppi',
    name: 'peppi',
    displayName: 'Peppi',
    description: 'The energetic wellness guide',
    videoFile: '/video/mascots/peppi.mp4',
    thumbnailFile: '/video/mascots/peppi-thumb.jpg',
  },
];

export const getMascotById = (id: string): Mascot | undefined => {
  return mascots.find((mascot) => mascot.id === id);
};

export const getMascotByName = (name: string): Mascot | undefined => {
  return mascots.find((mascot) => mascot.name === name);
};
