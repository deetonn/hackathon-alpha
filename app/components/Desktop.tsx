import WindowManager from './WindowManager';
import DesktopIcons from './DesktopIcons';
import TaskBar from './taskbar/TaskBar';

export default function Desktop() {
  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('desktop-area')) {
      const icons = document.querySelectorAll('.desktop-icon-selected');
      icons.forEach(icon => icon.classList.remove('desktop-icon-selected'));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#008080] overflow-hidden">
      {/* Main workspace area */}
      <div 
        className="flex-1 relative desktop-area"
        onClick={handleDesktopClick}
      >
        <DesktopIcons />
        <WindowManager />
      </div>

      {/* TaskBar now handles everything related to the bottom bar */}
      <TaskBar />
    </div>
  );
} 