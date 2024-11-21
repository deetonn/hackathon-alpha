'use client';
import { useState, useEffect } from 'react';

export default function Clock() {
  // Initialize with null to avoid hydration mismatch
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time once mounted
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render anything until after first client-side update
  if (!time) return <div className="px-2 py-1 border-2 border-inset min-w-[70px] text-center text-sm">
    --:-- --
  </div>;

  return (
    <div className="px-2 py-1 border-2 border-inset min-w-[70px] text-center text-sm">
      {time.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })}
    </div>
  );
} 