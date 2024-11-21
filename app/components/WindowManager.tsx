import { applications } from '../config/applications';
import { useKernel } from '../contexts/KernelContext';
import { Window } from './Window';

export default function WindowManager() {
  const { state } = useKernel();

  return (
    <>
      {state.windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          position={window.position}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          size={applications[window.id.split('-')[0]]?.defaultSize || { width: 600, height: 400 }}
        >
          {window.content}
        </Window>
      ))}
    </>
  );
} 