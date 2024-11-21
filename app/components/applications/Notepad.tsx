import { useState } from 'react';

export default function Notepad() {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="w95-menubar">
        <button className="w95-button">File</button>
        <button className="w95-button">Edit</button>
        <button className="w95-button">Help</button>
      </div>
      <textarea
        className="flex-1 w-full p-2 bg-white border-inset resize-none focus:outline-none font-[system-ui]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
} 