import { useState } from 'react';
import { useKernel } from '../contexts/KernelContext';
import { applications } from '../config/applications';
import { launchApplication } from '../utils/windowManager';

interface StartMenuProps {
  onClose: () => void;
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const { dispatch } = useKernel();

  const handleAppClick = (appId: string) => {
    launchApplication(appId, dispatch);
    onClose();
  };

  return (
    <div className="absolute bottom-full left-0 mb-1 z-50
      w-64 bg-[#c0c0c0] 
      border-t-[#ffffff] border-l-[#ffffff] 
      border-r-[#808080] border-b-[#808080] border-2"
    >
      {/* Windows 95 black bar with user name */}
      <div className="bg-[#000080] text-white px-2 py-1 flex items-center gap-2">
        <img 
          src="/icons/user.png" 
          alt="User" 
          className="w-8 h-8"
        />
        <span className="font-bold">User</span>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        {Object.values(applications).map((app) => (
          <button
            key={app.id}
            className="w-full px-4 py-1 text-left hover:bg-[#000080] hover:text-white
              flex items-center gap-2"
            onClick={() => handleAppClick(app.id)}
          >
            <img 
              src={app.icon} 
              alt={app.title} 
              className="w-4 h-4"
            />
            <span>{app.title}</span>
          </button>
        ))}

        {/* Separator */}
        <div className="mx-2 my-1 border-t border-[#808080] border-b border-[#ffffff]" />

        {/* Shutdown button */}
        <button
          className="w-full px-4 py-1 text-left hover:bg-[#000080] hover:text-white
            flex items-center gap-2"
          onClick={onClose}
        >
          <img 
            src="/icons/shutdown.webp" 
            alt="Shut Down" 
            className="w-4 h-4"
          />
          <span>Shut Down...</span>
        </button>
      </div>
    </div>
  );
} 