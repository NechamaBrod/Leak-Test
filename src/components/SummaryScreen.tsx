import type { AnswerRecord } from '../types';
import { CATEGORY_META } from '../data/categories';
import { computeCategoryScores } from '../state/quizReducer';

interface Props {
  answers: AnswerRecord[];
  total: number;
  onRestart: () => void;
}

export function SummaryScreen({ answers, total, onRestart }: Props) {
  const correctCount = answers.filter((a) => a.correct).length;
  const pct = Math.round((correctCount / total) * 100);
  const scores = computeCategoryScores(answers);

  const verdict = getVerdict(pct);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-[fade-in_400ms_ease-out]">
      <div className="text-center mb-10">
        <div className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">
          הדוח האישי שלך
        </div>
        <div className="text-7xl sm:text-8xl font-extrabold font-mono mb-2 bg-gradient-to-l from-accent to-blue bg-clip-text text-transparent">
          {correctCount}
          <span className="text-4xl sm:text-5xl text-text-dim">/{total}</span>
        </div>
        <div className={`text-xl font-bold ${verdict.color} mb-2`}>
          {verdict.title}
        </div>
        <p className="text-text-muted max-w-md mx-auto leading-relaxed">
          {verdict.subtitle}
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-4">
          ציון לפי שכבת אבטחה
        </h2>
        <div className="space-y-3">
          {scores.map((s) => {
            const meta = CATEGORY_META[s.category];
            const ratio = s.total === 0 ? 0 : s.correct / s.total;
            const barPct = Math.round(ratio * 100);
            const color = getBarColor(ratio);
            return (
              <div
                key={s.category}
                className="rounded-xl border border-border bg-bg-elevated p-4"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="font-semibold text-text">{meta.label}</div>
                    <div className="text-xs text-text-dim font-mono">
                      {meta.short}
                    </div>
                  </div>
                  <div className="font-mono text-sm">
                    <span className="text-text font-bold">{s.correct}</span>
                    <span className="text-text-dim">/{s.total}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} transition-all duration-700 ease-out`}
                    style={{ width: `${barPct}%` }}
                  />
                </div>
                {ratio < 1 && (
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    {meta.recommendation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-accent/30 bg-gradient-to-bl from-accent/10 to-blue/5 p-6 mb-8 text-center">
        <h3 className="text-lg font-bold text-text mb-2">מה הלאה?</h3>
        <p className="text-text-muted mb-4">
          עכשיו את מוכנה לשיעור התיאורטי על אבטחת מידע ב-AI.
        </p>
        <a
          href="#TODO_LESSON_URL"
          className="inline-block px-6 py-3 rounded-xl bg-accent hover:bg-accent-dim transition-all text-white font-semibold glow-accent"
        >
          המשיכי לשיעור ←
        </a>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="text-sm text-text-muted hover:text-text transition-colors underline underline-offset-4 decoration-text-dim"
        >
          התחילי מחדש
        </button>
      </div>
    </div>
  );
}

function getVerdict(pct: number): { title: string; subtitle: string; color: string } {
  if (pct === 100) {
    return {
      title: 'הגנה מצוינת',
      subtitle: 'את חושבת על אבטחה לפני שאת חושבת על תוצאה. נדיר.',
      color: 'text-success',
    };
  }
  if (pct >= 80) {
    return {
      title: 'זהירה',
      subtitle: 'את מזהה את רוב הסיכונים. השיעור הזה יחדד את מה שפספסת.',
      color: 'text-success',
    };
  }
  if (pct >= 60) {
    return {
      title: 'יש פערים',
      subtitle: 'את שולחת למודל יותר ממה שכדאי. השיעור הזה בדיוק בשבילך.',
      color: 'text-warning',
    };
  }
  if (pct >= 40) {
    return {
      title: 'סיכון גבוה',
      subtitle: 'את היית דולפת נתונים. רגע לפני שאת ממשיכה — שווה לראות את השיעור.',
      color: 'text-warning',
    };
  }
  return {
    title: 'דליפה רחבה',
    subtitle: 'אילו זה היה production, היית בבעיה. בואי נסדר את זה.',
    color: 'text-danger',
  };
}

function getBarColor(ratio: number): string {
  if (ratio >= 1) return 'bg-success';
  if (ratio >= 0.5) return 'bg-warning';
  return 'bg-danger';
}
