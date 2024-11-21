'use client';

import { useState } from 'react';

interface DesktopIconProps {
  id: string;
  icon: string;
  title: string;
  onDoubleClick: () => void;
}

export function DesktopIcon({ icon, title, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div 
      className={`flex flex-col items-center w-20 p-2 cursor-pointer group
        ${isSelected ? 'desktop-icon-selected' : ''}`}
      onClick={() => setIsSelected(true)}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
        setIsSelected(false);
      }}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
    >
      <img 
        src={icon} 
        alt={title} 
        className="w-8 h-8 mb-1"
        draggable={false}
      />
      <span className="desktop-icon-text group-hover:bg-[#000080]">
        {title}
      </span>
    </div>
  );
} 