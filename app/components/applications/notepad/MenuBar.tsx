import { useEffect, useRef } from 'react';

interface MenuBarProps {
  isMenuOpen: string | null;
  onMenuClick: (menu: string) => void;
  onNew: () => void;
  onSave: () => void;
  onOpen: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wordWrap: boolean;
  onToggleWordWrap: () => void;
  onEditOperation: (operation: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function MenuBar({ isMenuOpen, onMenuClick, onNew, onSave, onOpen, wordWrap, onToggleWordWrap, onEditOperation, textareaRef }: MenuBarProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onMenuClick('');  // Close menu
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, onMenuClick]);

  const menus = {
    File: [
      { label: 'New', action: onNew, shortcut: 'Ctrl+N' },
      { label: 'Open...', action: () => document.getElementById('fileInput')?.click(), shortcut: 'Ctrl+O' },
      { label: 'Save', action: onSave, shortcut: 'Ctrl+S' },
      { label: 'Save As...', action: onSave },
      { type: 'separator' },
      { label: 'Page Setup...' },
      { label: 'Print...', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { label: 'Exit', action: () => window.close() }
    ],
    Edit: [
      { label: 'Undo', action: () => onEditOperation('undo'), shortcut: 'Ctrl+Z' },
      { type: 'separator' },
      { label: 'Cut', action: () => onEditOperation('cut'), shortcut: 'Ctrl+X' },
      { label: 'Copy', action: () => onEditOperation('copy'), shortcut: 'Ctrl+C' },
      { label: 'Paste', action: () => onEditOperation('paste'), shortcut: 'Ctrl+V' },
      { label: 'Delete', action: () => onEditOperation('delete'), shortcut: 'Del' },
      { type: 'separator' },
      { label: 'Select All', action: () => onEditOperation('selectAll'), shortcut: 'Ctrl+A' },
      { label: 'Time/Date', action: () => onEditOperation('timeDate'), shortcut: 'F5' }
    ],
    Format: [
      { label: 'Word Wrap', action: onToggleWordWrap, checked: wordWrap }
    ],
    Help: [
      { label: 'Help Topics' },
    ]
  };

  return (
    <div className="flex flex-col" ref={menuRef}>
      <div className="flex bg-[#c0c0c0] border-b border-[#808080]">
        {Object.entries(menus).map(([menuName]) => (
          <button
            key={menuName}
            className={`px-4 py-1 ${
              isMenuOpen === menuName 
                ? 'bg-[#000080] text-white' 
                : 'hover:bg-[#000080] hover:text-white'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick(menuName);
            }}
          >
            {menuName}
          </button>
        ))}
      </div>

      {/* Dropdown Menus */}
      {isMenuOpen && (
        <div className="absolute z-50">
          {Object.entries(menus).map(([menuName, items]) => (
            isMenuOpen === menuName && (
              <div
                key={menuName}
                className="absolute bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] py-1 min-w-[200px]"
                style={{
                  left: menuName === 'File' ? '0' : 
                        menuName === 'Edit' ? '45px' : '90px',
                  top: '20px'  // Adjust this value to position the dropdown below the menu bar
                }}
              >
                {items.map((item: any, index) => (
                  item.type === 'separator' ? (
                    <div 
                      key={index}
                      className="h-[1px] bg-[#808080] my-1 mx-2"
                    />
                  ) : (
                    <button
                      key={index}
                      className="w-full px-4 py-1 text-left hover:bg-[#000080] hover:text-white flex justify-between items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        item.action();
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[#808080] ml-8 hover:text-white">{item.shortcut}</span>
                      )}
                    </button>
                  )
                ))}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
} 