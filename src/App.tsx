import type { Choice } from './types';
import { snippets } from './data/snippets';
import { usePersistedQuiz } from './hooks/usePersistedQuiz';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { SummaryScreen } from './components/SummaryScreen';

export default function App() {
  const [state, dispatch] = usePersistedQuiz();
  const total = snippets.length;

  const snippetById = (id: number | undefined) =>
    id == null ? undefined : snippets.find((s) => s.id === id);
  const currentSnippet =
    state.order.length > 0
      ? snippetById(state.order[state.currentIndex])
      : snippets[state.currentIndex];

  const handleStart = () =>
    dispatch({ type: 'START', snippetIds: snippets.map((s) => s.id) });
  const handleAnswer = (choice: Choice) => {
    if (!currentSnippet) return;
    dispatch({ type: 'ANSWER', snippet: currentSnippet, chosen: choice });
  };
  const handleNext = () => dispatch({ type: 'NEXT', total });
  const handleRestart = () => dispatch({ type: 'RESET' });

  const hasProgress =
    state.phase !== 'intro' &&
    (state.answers.length > 0 || state.currentIndex > 0);

  return (
    <div className="min-h-full bg-bg text-text">
      <BackgroundGlow />
      <main className="relative z-10">
        {state.phase === 'intro' && (
          <IntroScreen onStart={handleStart} hasProgress={hasProgress} />
        )}

        {state.phase === 'question' && currentSnippet && (
          <QuestionScreen
            snippet={currentSnippet}
            index={state.currentIndex}
            total={total}
            chosen={null}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {state.phase === 'feedback' && currentSnippet && (
          <QuestionScreen
            snippet={currentSnippet}
            index={state.currentIndex}
            total={total}
            chosen={
              state.answers.find(
                (a) => a.snippetId === currentSnippet.id,
              )?.chosen ?? null
            }
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {state.phase === 'summary' && (
          <SummaryScreen
            answers={state.answers}
            total={total}
            onRestart={handleRestart}
          />
        )}
      </main>
      <footer className="relative z-10 py-8 text-center text-xs text-text-dim">
        The Leak Test · client-side only
      </footer>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-3xl" />
    </div>
  );
}
