import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Window {
  id: string;
  title: string;
  content: ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

interface KernelState {
  windows: Window[];
  activeWindowId: string | null;
  highestZIndex: number;
}

type KernelAction =
  | { type: 'OPEN_WINDOW'; payload: Omit<Window, 'zIndex'> }
  | { type: 'CLOSE_WINDOW'; payload: string }
  | { type: 'MINIMIZE_WINDOW'; payload: string }
  | { type: 'MAXIMIZE_WINDOW'; payload: string }
  | { type: 'FOCUS_WINDOW'; payload: string }
  | { type: 'UPDATE_WINDOW_POSITION'; payload: { id: string; position: { x: number; y: number } } };

const initialState: KernelState = {
  windows: [],
  activeWindowId: null,
  highestZIndex: 0,
};

function kernelReducer(state: KernelState, action: KernelAction): KernelState {
  switch (action.type) {
    case 'OPEN_WINDOW':
      return {
        ...state,
        windows: [...state.windows, { ...action.payload, zIndex: state.highestZIndex + 1 }],
        activeWindowId: action.payload.id,
        highestZIndex: state.highestZIndex + 1,
      };

    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(window => window.id !== action.payload),
        activeWindowId: state.activeWindowId === action.payload 
          ? state.windows.length > 1 
            ? state.windows[state.windows.length - 2].id 
            : null
          : state.activeWindowId,
      };

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload
            ? { ...window, isMinimized: !window.isMinimized }
            : window
        ),
        activeWindowId: state.activeWindowId === action.payload && !state.windows.find(w => w.id === action.payload)?.isMinimized
          ? null
          : state.activeWindowId
      };

    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload
            ? { ...window, isMaximized: !window.isMaximized }
            : window
        ),
      };

    case 'FOCUS_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload
            ? { ...window, zIndex: state.highestZIndex + 1 }
            : window
        ),
        activeWindowId: action.payload,
        highestZIndex: state.highestZIndex + 1,
      };

    case 'UPDATE_WINDOW_POSITION':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, position: action.payload.position }
            : window
        ),
      };

    default:
      return state;
  }
}

export const KernelContext = createContext<{
  state: KernelState;
  dispatch: React.Dispatch<KernelAction>;
} | null>(null);

export function KernelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(kernelReducer, initialState);

  return (
    <KernelContext.Provider value={{ state, dispatch }}>
      {children}
    </KernelContext.Provider>
  );
}

export function useKernel() {
  const context = useContext(KernelContext);
  if (!context) {
    throw new Error('useKernel must be used within a KernelProvider');
  }
  return context;
} 