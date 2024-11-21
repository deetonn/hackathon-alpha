import { useKernel } from '../contexts/KernelContext';

export function useWindow(windowId: string) {
  const { dispatch } = useKernel();

  const closeWindow = () => {
    dispatch({ type: 'CLOSE_WINDOW', payload: windowId });
  };

  const minimizeWindow = () => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: windowId });
  };

  const maximizeWindow = () => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: windowId });
  };

  return {
    closeWindow,
    minimizeWindow,
    maximizeWindow
  };
} 