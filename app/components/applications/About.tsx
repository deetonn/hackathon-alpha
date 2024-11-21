export default function About() {
  return (
    <div className="flex flex-col items-center p-4 text-center">
      <img 
        src="/windows-logo.png" 
        alt="Windows Logo" 
        className="w-16 h-16 mb-4"
      />
      <h2 className="font-bold mb-2">Windows 95 Clone</h2>
      <p className="mb-4">Built with Next.js and React</p>
      
      <div className="w-full border-t border-[#808080] my-4" />
      
      <div className="text-sm">
        <p>Your Computer:</p>
        <p>Memory: 640K (Should be enough for anybody)</p>
        <p>Processor: Web Browser</p>
      </div>
      
      <button className="w95-button mt-4 px-8">
        OK
      </button>
    </div>
  );
} 