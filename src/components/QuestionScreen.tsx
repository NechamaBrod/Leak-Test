import type { Choice, Snippet } from '../types';
import { CodeBlock } from './CodeBlock';
import { FeedbackPanel } from './FeedbackPanel';
import { ProgressBar } from './ProgressBar';

interface Props {
  snippet: Snippet;
  index: number;
  total: number;
  chosen: Choice | null;
  onAnswer: (choice: Choice) => void;
  onNext: () => void;
}

export function QuestionScreen({
  snippet,
  index,
  total,
  chosen,
  onAnswer,
  onNext,
}: Props) {
  const showFeedback = chosen !== null;
  const isLast = index === total - 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-8 max-w-2xl">
        <ProgressBar current={index + 1} total={total} />
      </div>

      <div
        className={`grid gap-6 transition-all duration-300 ${
          showFeedback ? 'lg:grid-cols-[1fr,420px]' : 'lg:grid-cols-1 max-w-3xl mx-auto'
        }`}
      >
        {/* Main column */}
        <div className="animate-[slide-up_320ms_cubic-bezier(0.16,1,0.3,1)]">
          <div className="mb-5">
            <div className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">
              תרחיש
            </div>
            <p className="text-lg text-text leading-relaxed">{snippet.scenario}</p>
          </div>

          <CodeBlock
            code={snippet.code}
            language={snippet.language}
            highlightedLines={showFeedback ? snippet.leakedLines : []}
          />

          {!showFeedback && (
            <div className="mt-6">
              <div className="text-sm text-text-muted mb-3">
                מה היית עושה עם הקטע הזה?
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <ChoiceButton
                  variant="danger"
                  label="שלחי כמו שזה"
                  hint="העתק-הדבק ישירות למודל"
                  onClick={() => onAnswer('send')}
                />
                <ChoiceButton
                  variant="safe"
                  label="סנני קודם"
                  hint="הסירי / החליפי את החלקים הרגישים"
                  onClick={() => onAnswer('filter')}
                />
              </div>
            </div>
          )}
        </div>

        {/* Feedback column */}
        {showFeedback && (
          <div className="lg:sticky lg:top-6 lg:self-start">
            <FeedbackPanel
              snippet={snippet}
              chosen={chosen}
              onNext={onNext}
              isLast={isLast}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ChoiceButton({
  variant,
  label,
  hint,
  onClick,
}: {
  variant: 'danger' | 'safe';
  label: string;
  hint: string;
  onClick: () => void;
}) {
  const styles =
    variant === 'danger'
      ? 'hover:border-danger/60 hover:bg-danger/5'
      : 'hover:border-success/60 hover:bg-success/5';
  return (
    <button
      onClick={onClick}
      className={`group text-right p-5 rounded-xl border border-border bg-bg-elevated transition-all duration-200 active:scale-[0.99] ${styles}`}
    >
      <div className="font-semibold text-text mb-1">{label}</div>
      <div className="text-sm text-text-muted">{hint}</div>
    </button>
  );
}
