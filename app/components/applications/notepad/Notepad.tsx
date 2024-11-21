import { useState, useRef, useEffect } from 'react';
import MenuBar from './MenuBar';
import StatusBar from './StatusBar';

export default function Notepad() {
  const [text, setText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
  const [fileName, setFileName] = useState('Untitled');
  const [wordWrap, setWordWrap] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMenuClick = (menu: string) => {
    setIsMenuOpen(menu === isMenuOpen ? null : menu);
  };

  const handleSave = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setIsMenuOpen(null);
  };

  const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
        setFileName(file.name.replace('.txt', ''));
      };
      reader.readAsText(file);
    }
    setIsMenuOpen(null);
  };

  const handleNew = () => {
    setText('');
    setFileName('Untitled');
    setIsMenuOpen(null);
  };

  const handleCursorPosition = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const value = textarea.value;
    const selectionStart = textarea.selectionStart;
    
    // Calculate line number
    const lines = value.substr(0, selectionStart).split('\n');
    const currentLine = lines.length;
    
    // Calculate column number
    const currentColumn = lines[lines.length - 1].length + 1;

    setCursorPosition({ line: currentLine, column: currentColumn });
  };

  const toggleWordWrap = () => {
    setWordWrap(!wordWrap);
    setIsMenuOpen(null);
  };

  const handleEditOperation = (operation: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    switch (operation) {
      case 'undo':
        textarea.focus();
        document.execCommand('undo');
        break;
      case 'cut':
        textarea.focus();
        document.execCommand('cut');
        break;
      case 'copy':
        textarea.focus();
        document.execCommand('copy');
        break;
      case 'paste':
        textarea.focus();
        document.execCommand('paste');
        break;
      case 'delete':
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = text.slice(0, start) + text.slice(end);
        setText(newText);
        textarea.focus();
        break;
      case 'selectAll':
        textarea.focus();
        textarea.select();
        break;
      case 'timeDate':
        const date = new Date().toLocaleString();
        const cursorPos = textarea.selectionStart;
        const newContent = text.slice(0, cursorPos) + date + text.slice(cursorPos);
        setText(newContent);
        textarea.focus();
        textarea.setSelectionRange(cursorPos + date.length, cursorPos + date.length);
        break;
    }
    setIsMenuOpen(null);
  };

  return (
    <div className="flex flex-col h-full">
      <MenuBar 
        isMenuOpen={isMenuOpen}
        onMenuClick={handleMenuClick}
        onNew={handleNew}
        onSave={handleSave}
        onOpen={handleOpen}
        wordWrap={wordWrap}
        onToggleWordWrap={toggleWordWrap}
        onEditOperation={handleEditOperation}
        textareaRef={textareaRef}
      />
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleCursorPosition}
        onClick={handleCursorPosition}
        className={`flex-1 p-1 
          resize-none 
          focus:outline-none 
          font-[Lucida Console] 
          border-[2px] border-inset
          bg-white
          text-black
          ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}
          overflow-auto`}
        spellCheck={false}
        autoFocus
      />
      
      <StatusBar 
        line={cursorPosition.line}
        column={cursorPosition.column}
      />
      
      <input 
        type="file" 
        accept=".txt"
        className="hidden" 
        id="fileInput" 
        onChange={handleOpen}
      />
    </div>
  );
} 