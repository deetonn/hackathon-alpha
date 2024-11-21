import { useKernel } from '../contexts/KernelContext';

export default function TaskBar() {
  const { state, dispatch } = useKernel();

  return (
    <div className="flex-1 flex gap-1 px-2">
      {state.windows.map((window) => (
        <button
          key={window.id}
          className={`px-2 min-w-[100px] h-8 text-left truncate ${
            state.activeWindowId === window.id
              ? 'bg-[#c0c0c0] border-inset'
              : 'bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border-2'
          }`}
          onClick={() => {
            if (window.isMinimized) {
              dispatch({ type: 'MINIMIZE_WINDOW', payload: window.id });
            }
            dispatch({ type: 'FOCUS_WINDOW', payload: window.id });
          }}
        >
          {window.title}
        </button>
      ))}
    </div>
  );
} 