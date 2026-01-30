import React from 'react';
import clsx from 'clsx';

interface MascotAvatarProps {
  videoSrc: string;
  name: string;
  accentColor: string;
  isActive: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

const MascotAvatar: React.FC<MascotAvatarProps> = ({
  videoSrc,
  name,
  accentColor,
  isActive,
  onClick,
  onHover,
}) => {
  return (
    <button
      type="button"
      aria-label={name}
      className={clsx(
        'relative rounded-full overflow-hidden shadow-lg transition-transform duration-300',
        'focus:outline-none',
        isActive ? 'ring-4 ring-pink-500 scale-105 z-20' : 'hover:scale-105 hover:ring-2 hover:ring-pink-400',
        'bg-black'
      )}
      style={{ boxShadow: `0 0 0 2px ${accentColor}` }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-32 h-32 object-cover rounded-full transition-all duration-300"
        style={{ filter: isActive ? 'brightness(1.1) drop-shadow(0 0 12px #FF1B8D)' : 'brightness(1)' }}
      />
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-black/70 px-2 py-0.5 rounded-full pointer-events-none">
        {name}
      </span>
    </button>
  );
};

export default MascotAvatar;
