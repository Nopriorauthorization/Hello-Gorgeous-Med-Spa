import Mascot from '../../components/mascots/Mascot';

const mascots = [
  {
    name: 'Peppi',
    videoSrc: '/mascots/peppi.mp4',
    ctaText: 'Chat with Peppi',
  },
  {
    name: 'Beau-Tox',
    videoSrc: '/mascots/beau-tox.mp4',
    ctaText: 'Chat with Beau-Tox',
  },
  {
    name: 'Filla Grace',
    videoSrc: '/mascots/filla-grace.mp4',
    ctaText: 'Chat with Filla Grace',
  },
  {
    name: 'Harmony',
    videoSrc: '/mascots/harmony.mp4',
    ctaText: 'Chat with Harmony',
  },
  {
    name: 'Founder',
    videoSrc: '/mascots/founder.mp4',
    ctaText: 'Chat with Founder',
  },
  {
    name: 'Slim-T',
    videoSrc: '/mascots/slim-t.mp4',
    ctaText: 'Chat with Slim-T',
  },
  {
    name: 'Roots',
    videoSrc: '/mascots/roots.mp4',
    ctaText: 'Chat with Roots',
  },
  {
    name: 'Decode',
    videoSrc: '/mascots/decode.mp4',
    ctaText: 'Chat with Decode',
  },
];

export default function MeetTheTeam() {
  return (
    <div className="min-h-screen bg-white text-black py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Meet the Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {mascots.map((mascot) => (
          <div key={mascot.name} className="flex flex-col items-center">
            <Mascot
              name={mascot.name}
              videoSrc={mascot.videoSrc}
              ctaText={mascot.ctaText}
              position="static"
            />
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{mascot.name}</h2>
              <button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
                {mascot.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
