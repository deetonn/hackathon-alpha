import { useState, useRef, useEffect } from 'react';
import { useKernel } from '../contexts/KernelContext';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

export function Window({ id, title, children, position, isMinimized, isMaximized }: WindowProps) {
  const { dispatch } = useKernel();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        dispatch({
          type: 'UPDATE_WINDOW_POSITION',
          payload: {
            id,
            position: {
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            },
          },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, dispatch, id, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMaximized) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
    dispatch({ type: 'FOCUS_WINDOW', payload: id });
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div 
      ref={windowRef}
      className={`absolute ${
        isMaximized ? 'w-full h-full top-0 left-0' : 'w-[600px]'
      } bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border-2`}
      style={{ 
        left: isMaximized ? 0 : position.x, 
        top: isMaximized ? 0 : position.y,
        display: 'block'
      }}
    >
      <div 
        className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span>{title}</span>
        <div className="flex gap-1">
          <button 
            onClick={() => dispatch({ type: 'MINIMIZE_WINDOW', payload: id })}
            className="px-2 bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border text-black"
          >
            _
          </button>
          <button 
            onClick={() => dispatch({ type: 'MAXIMIZE_WINDOW', payload: id })}
            className="px-2 bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border text-black"
          >
            □
          </button>
          <button 
            onClick={() => dispatch({ type: 'CLOSE_WINDOW', payload: id })}
            className="px-2 bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border text-black"
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
} 