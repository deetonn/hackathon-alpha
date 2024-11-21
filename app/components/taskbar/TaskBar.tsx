import { useKernel } from '../../contexts/KernelContext';
import TaskBarItem from './TaskBarItem';
import Clock from './Clock';
import StartButton from './StartButton';

export default function TaskBar() {
  const { state, dispatch } = useKernel();

  const handleWindowClick = (windowId: string) => {
    const window = state.windows.find(w => w.id === windowId);
    
    dispatch({ type: 'MINIMIZE_WINDOW', payload: windowId });
    
    if (window?.isMinimized) {
      dispatch({ type: 'FOCUS_WINDOW', payload: windowId });
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-[28px] 
        bg-[#c0c0c0] 
        border-t-[#ffffff] border-l-[#ffffff] 
        border-r-[#808080] border-b-[#808080] border-2
        flex items-center gap-1 px-1 z-50"
    >
      <StartButton />
      
      {/* Separator */}
      <div className="w-[1px] h-[22px] bg-[#808080] mx-1" />
      
      {/* Running Applications */}
      <div className="flex-1 flex gap-1 overflow-x-auto">
        {state.windows.map((window) => (
          <TaskBarItem
            key={window.id}
            title={window.title}
            isActive={state.activeWindowId === window.id}
            isMinimized={window.isMinimized}
            onClick={() => handleWindowClick(window.id)}
          />
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center border-inset px-1 py-[2px] gap-1">
        <Clock />
      </div>
    </div>
  );
} 