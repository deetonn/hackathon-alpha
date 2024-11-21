interface StatusBarProps {
  line: number;
  column: number;
}

export default function StatusBar({ line, column }: StatusBarProps) {
  return (
    <div className="h-[20px] bg-[#c0c0c0] border-t border-[#808080] px-2 text-sm flex items-center">
      <span>Ln {line}, Col {column}</span>
    </div>
  );
} 