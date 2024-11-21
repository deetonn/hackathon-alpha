import { createContext, useCallback, useState, useContext, useEffect, ReactNode } from 'react';

interface WindowManagerContextType {
  // ... existing properties ...
  setWindowTitle: (windowId: string, title: string) => void;
}

export const WindowManagerContext = createContext<WindowManagerContextType>({
  // ... existing defaults ...
  setWindowTitle: () => {},
});

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  // ... existing state ...
  const [windowTitles, setWindowTitles] = useState<Record<string, string>>({});

  const setWindowTitle = useCallback((windowId: string, newTitle: string) => {
    setWindowTitles(prev => ({
      ...prev,
      [windowId]: newTitle
    }));
  }, []);

  return (
    <WindowManagerContext.Provider value={{
      // ... existing values ...
      setWindowTitle,
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
} 