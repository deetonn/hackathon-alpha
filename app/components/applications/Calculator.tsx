export default function Calculator() {
  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Display */}
      <input
        type="text"
        readOnly
        value="0"
        className="w-full p-2 text-right bg-white border-inset font-[system-ui] mb-2"
      />
      
      {/* Buttons */}
      <div className="grid grid-cols-4 gap-1">
        {['7', '8', '9', '/', 
          '4', '5', '6', '*',
          '1', '2', '3', '-',
          '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            className="w95-button p-2 text-center"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
} 