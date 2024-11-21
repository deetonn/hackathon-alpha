import { useEffect, useState } from 'react';
import { useWindow } from '../../hooks/useWindow';

interface SystemInfo {
  browser: string;
  os: string;
  memory: string;
  processor: string;
}

export default function About({windowId}: {windowId: string}) {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    browser: 'Unknown Browser',
    os: 'Unknown OS',
    memory: '640K',
    processor: 'Unknown Processor'
  });

  const { closeWindow } = useWindow(windowId);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    
    // Parse browser
    const getBrowser = () => {
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Safari')) return 'Safari';
      if (ua.includes('Edge')) return 'Edge';
      if (ua.includes('Opera')) return 'Opera';
      return 'Unknown Browser';
    };

    // Parse OS
    const getOS = () => {
      if (ua.includes('Windows')) return 'Windows';
      if (ua.includes('Mac')) return 'MacOS';
      if (ua.includes('Linux')) return 'Linux';
      if (ua.includes('Android')) return 'Android';
      if (ua.includes('iOS')) return 'iOS';
      return 'Unknown OS';
    };

    const getMemory = () => {
      return '640K (Should be enough for anybody)';
    };

    // Get processor info
    const getProcessor = () => {
      const platform = navigator.platform || 'Unknown Platform';
      if (ua.includes('Win64') || ua.includes('x64')) {
        return '64-bit processor';
      }
      return '32-bit processor';
    };

    setSystemInfo({
      browser: getBrowser(),
      os: getOS(),
      memory: getMemory(),
      processor: getProcessor()
    });
  }, []);

  return (
    <div className="min-w-[425px]">
      <div className="p-4">
        {/* Top section with logo and title */}
        <div className="flex gap-4 items-start">
          <img 
            src="/windows-logo.png" 
            alt="Windows Logo" 
            className="w-12 h-12 object-contain"
          />
          <div className="text-white">
            <h2 className="text-lg font-bold">Windows 95 Web Clone</h2>
            <p>Built with Next.js and React</p>
            <p className="text-sm">© 2024 Your Name</p>
          </div>
        </div>
        
        <hr className="border-t border-[#808080] border-b border-[#ffffff] my-4" />
        
        {/* Info section */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-bold mb-2">System Information:</p>
            <div className="space-y-1">
              <div className="flex">
                <span className="w-24">Browser:</span>
                <span>{systemInfo.browser}</span>
              </div>
              <div className="flex">
                <span className="w-24">OS:</span>
                <span>{systemInfo.os}</span>
              </div>
              <div className="flex">
                <span className="w-24">Memory:</span>
                <span>{systemInfo.memory}</span>
              </div>
              <div className="flex">
                <span className="w-24">Processor:</span>
                <span>{systemInfo.processor}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold mb-2">Web Capabilities:</p>
            <div className="space-y-1">
              <div className="flex">
                <span className="w-24">JavaScript:</span>
                <span>Enabled</span>
              </div>
              <div className="flex">
                <span className="w-24">Cookies:</span>
                <span>{navigator.cookieEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex">
                <span className="w-24">Online:</span>
                <span>{navigator.onLine ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button at the bottom */}
        <div className="flex justify-center mt-6">
          <button 
            className="px-8 py-1 min-w-[75px]
              bg-[#c0c0c0] 
              border-t-[#ffffff] border-l-[#ffffff] 
              border-r-[#808080] border-b-[#808080] 
              border-2
              active:border-t-[#808080] active:border-l-[#808080] 
              active:border-r-[#ffffff] active:border-b-[#ffffff]"
            onClick={closeWindow}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
} 