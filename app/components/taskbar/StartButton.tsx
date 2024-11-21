import { useState } from 'react';
import StartMenu from '../StartMenu';

export default function StartButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className={`
          h-[22px] px-2
          flex items-center gap-1
          bg-[#c0c0c0] 
          border-2
          ${isMenuOpen 
            ? 'border-inset' 
            : 'border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080]'
          }
        `}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img 
          src="/windows-logo.png" 
          alt="Start" 
          className="w-4 h-4"
        />
        <span className="font-bold">Start</span>
      </button>

      {isMenuOpen && (
        <>
          <StartMenu onClose={() => setIsMenuOpen(false)} />
          {/* Overlay to catch clicks outside the menu */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        </>
      )}
    </div>
  );
} 