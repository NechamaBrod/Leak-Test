import type { Choice, Snippet } from '../types';
import { CATEGORY_META } from '../data/categories';
import { CodeBlock } from './CodeBlock';

interface Props {
  snippet: Snippet;
  chosen: Choice;
  onNext: () => void;
  isLast: boolean;
}

export function FeedbackPanel({ snippet, chosen, onNext, isLast }: Props) {
  const isCorrect = chosen === snippet.correctAnswer;
  const meta = CATEGORY_META[snippet.category];
  const correctIsFilter = snippet.correctAnswer === 'filter';
  const headline = isCorrect
    ? correctIsFilter
      ? 'יפה. זיהית את הסיכון.'
      : 'יפה. זיהית שזה בטוח לשלוח.'
    : correctIsFilter
      ? 'זו הייתה דליפה.'
      : 'סינון יתר — לא היה כאן סיכון.';

  return (
    <aside
      className="rounded-2xl border border-border bg-bg-panel p-6 lg:p-7 animate-[slide-in-end_320ms_cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-5"
      aria-live="polite"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${
            isCorrect
              ? 'bg-success/15 text-success border border-success/30'
              : 'bg-danger/15 text-danger border border-danger/30'
          }`}
        >
          {isCorrect ? '✓' : '✕'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-text-dim font-medium mb-1">
            {isCorrect ? 'תשובה נכונה' : 'תשובה שגויה'}
          </div>
          <h3 className="text-xl font-bold leading-tight">{headline}</h3>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
          {meta.short}
        </span>
        <span className="text-xs text-text-muted">{meta.label}</span>
      </div>

      <p className="text-text leading-relaxed">
        {isCorrect ? snippet.feedback.correct : snippet.feedback.incorrect}
      </p>

      {snippet.leakedItems.length > 0 && (
        <div className="rounded-xl border border-border bg-bg-elevated p-4">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            מה היה דולף
          </div>
          <ul className="space-y-1.5">
            {snippet.leakedItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text leading-relaxed"
              >
                <span className="text-danger mt-1.5 leading-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {snippet.leakedLines && snippet.leakedLines.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            השורות הבעייתיות
          </div>
          <CodeBlock
            code={snippet.code}
            language={snippet.language}
            highlightedLines={snippet.leakedLines}
          />
        </div>
      )}

      {snippet.realWorldExample && (
        <div className="rounded-xl border border-blue/20 bg-blue/5 p-4">
          <div className="text-xs font-semibold text-blue uppercase tracking-wider mb-2">
            הקשר אמיתי
          </div>
          <p className="text-sm text-text leading-relaxed">
            {snippet.realWorldExample}
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full mt-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-dim transition-all text-white font-semibold glow-accent active:scale-[0.98]"
      >
        {isLast ? 'לדוח הסיכום' : 'לשאלה הבאה ←'}
      </button>
    </aside>
  );
}
