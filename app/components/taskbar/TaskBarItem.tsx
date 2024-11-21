interface TaskBarItemProps {
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  onClick: () => void;
}

export default function TaskBarItem({ title, isActive, isMinimized, onClick }: TaskBarItemProps) {
  return (
    <button
      className={`
        h-[22px] px-2 min-w-[125px] max-w-[200px]
        text-left truncate text-sm
        flex items-center gap-1
        ${isActive 
          ? 'bg-[#c0c0c0] border-inset' 
          : 'bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border-2'
        }
      `}
      onClick={onClick}
    >
      <img 
        src="/icons/window.png" 
        alt="" 
        className="w-4 h-4"
      />
      <span className={isMinimized ? 'opacity-50' : ''}>
        {title}
      </span>
    </button>
  );
} 