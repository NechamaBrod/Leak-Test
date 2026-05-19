interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-xs font-medium">
        <span className="text-text-muted">
          שאלה <span className="text-text">{current}</span> מתוך {total}
        </span>
        <span className="text-text-dim font-mono">{pct}%</span>
      </div>
      <div className="h-1 w-full bg-bg-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-accent to-blue transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
