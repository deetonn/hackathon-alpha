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
        >
          {window.content}
        </Window>
      ))}
    </>
  );
} 