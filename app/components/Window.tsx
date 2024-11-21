import { useState, useRef, useEffect } from 'react';
import { useKernel } from '../contexts/KernelContext';
import { applications } from '../config/applications';
import Image from 'next/image';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  isMinimized: boolean;
  isMaximized: boolean;
  size: { width: number; height: number };
}

export function Window({ 
  id, 
  title, 
  children, 
  position, 
  isMinimized, 
  isMaximized,
  size 
}: WindowProps) {
  const { state, dispatch } = useKernel();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const appId = id.split('-')[0];
  const icon = applications[appId]?.icon;

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

  return (
    <div 
      ref={windowRef}
      className={`absolute ${
        isMaximized ? 'w-full h-full top-0 left-0' : ''
      } bg-[#c0c0c0] border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] border-2 flex flex-col
        ${isMinimized ? 'hidden' : ''}`}
      style={{ 
        left: isMaximized ? 0 : position.x, 
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? '100%' : `${size.height}px`,
      }}
    >
      <div 
        className={`
          h-[20px] flex justify-between items-center cursor-move select-none shrink-0
          ${state.activeWindowId === id 
            ? 'bg-[#000080] bg-win95-titlebar' 
            : 'bg-[#808080]'
          }
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center px-1 gap-1">
          <Image 
            src={icon} 
            alt=""
            className="w-4 h-4"
            width={16}
            height={16}
          />
          <span className={`text-sm ${state.activeWindowId === id ? 'text-white' : 'text-[#c0c0c0]'}`}>
            {title}
          </span>
        </div>

        <div className="flex h-[14px] mr-[2px]">
          <button 
            onClick={() => dispatch({ type: 'MINIMIZE_WINDOW', payload: id })}
            className="w-[16px] h-[14px] flex items-center justify-center
              bg-[#c0c0c0] 
              border-t-[#ffffff] border-l-[#ffffff] 
              border-r-[#808080] border-b-[#808080] border
              hover:border-t-[#808080] hover:border-l-[#808080] 
              hover:border-r-[#ffffff] hover:border-b-[#ffffff]
              active:border-t-[#000000] active:border-l-[#000000] 
              active:border-r-[#ffffff] active:border-b-[#ffffff]
              text-black text-xs pb-[2px]"
          >
            _
          </button>
          <button 
            onClick={() => dispatch({ type: 'MAXIMIZE_WINDOW', payload: id })}
            className="w-[16px] h-[14px] mx-[2px] flex items-center justify-center
              bg-[#c0c0c0] 
              border-t-[#ffffff] border-l-[#ffffff] 
              border-r-[#808080] border-b-[#808080] border
              hover:border-t-[#808080] hover:border-l-[#808080] 
              hover:border-r-[#ffffff] hover:border-b-[#ffffff]
              active:border-t-[#000000] active:border-l-[#000000] 
              active:border-r-[#ffffff] active:border-b-[#ffffff]
              text-black text-xs"
          >
            □
          </button>
          <button 
            onClick={() => dispatch({ type: 'CLOSE_WINDOW', payload: id })}
            className="w-[16px] h-[14px] flex items-center justify-center
              bg-[#c0c0c0] 
              border-t-[#ffffff] border-l-[#ffffff] 
              border-r-[#808080] border-b-[#808080] border
              hover:border-t-[#808080] hover:border-l-[#808080] 
              hover:border-r-[#ffffff] hover:border-b-[#ffffff]
              active:border-t-[#000000] active:border-l-[#000000] 
              active:border-r-[#ffffff] active:border-b-[#ffffff]
              text-black text-xs"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {children}
      </div>
    </div>
  );
} 