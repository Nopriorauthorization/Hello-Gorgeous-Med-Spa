import React, { useState } from 'react';
import MascotCard from './MascotCard';
import { mascots } from './mascotsData';

const MascotGrid: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 w-full max-w-5xl">
        {mascots.map((mascot) => (
          <MascotCard
            key={mascot.id}
            mascot={mascot}
            expanded={expandedId === mascot.id}
            onClick={() => setExpandedId(expandedId === mascot.id ? null : mascot.id)}
            onHover={(hovered) => setHoveredId(hovered ? mascot.id : null)}
          />
        ))}
      </div>
    </div>
  );
};

export default MascotGrid;
