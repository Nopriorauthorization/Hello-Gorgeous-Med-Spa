import React from 'react';
import MascotAvatar from './MascotAvatar';
import { Mascot } from './mascotsData';

interface MascotCardProps {
  mascot: Mascot;
  expanded: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

const MascotCard: React.FC<MascotCardProps> = ({ mascot, expanded, onClick, onHover }) => {
  return (
    <div className="flex flex-col items-center">
      <MascotAvatar
        videoSrc={mascot.video}
        name={mascot.name}
        accentColor={mascot.accentColor || '#FF1B8D'}
        isActive={expanded}
        onClick={onClick}
        onHover={onHover}
      />
      <div
        className={`transition-all duration-300 w-64 mt-2 bg-white/90 rounded-xl shadow-xl border border-pink-100 px-4 py-3 text-center ${
          expanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none h-0 p-0 border-0'
        }`}
        style={{ minHeight: expanded ? 120 : 0 }}
      >
        {expanded && (
          <>
            <h3 className="text-lg font-bold text-pink-600 mb-1">{mascot.name}</h3>
            <p className="text-sm text-gray-700 mb-1">{mascot.personality}</p>
            <p className="text-xs text-gray-500 mb-2 italic">{mascot.service}</p>
            <button
              className="mt-2 px-4 py-1 rounded-full bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition-colors text-xs"
              type="button"
              tabIndex={expanded ? 0 : -1}
            >
              Book a consult (coming soon)
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MascotCard;
