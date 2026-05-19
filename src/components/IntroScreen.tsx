interface Props {
  onStart: () => void;
  hasProgress: boolean;
  onContinue?: () => void;
}

export function IntroScreen({ onStart, hasProgress, onContinue }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 animate-[fade-in_400ms_ease-out]">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-border bg-bg-elevated text-xs text-text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Hook · לפני השיעור התיאורטי
      </div>

      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
        כמה נתונים את{' '}
        <span className="bg-gradient-to-l from-accent to-blue bg-clip-text text-transparent">
          מדליפה
        </span>{' '}
        ל-AI?
      </h1>

      <p className="text-lg text-text-muted leading-relaxed mb-10">
        10 קטעי קוד. בכל קטע את בוחרת: לשלוח למודל כמו שהוא, או לסנן קודם.
        בסוף תקבלי דוח שכבה-שכבה — ותביני מה היית שולחת בלי לשים לב.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { label: 'דקות', value: '5–7' },
          { label: 'קטעים', value: '10' },
          { label: 'שכבות', value: '5' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-bg-elevated p-4 text-center"
          >
            <div className="text-2xl font-bold font-mono bg-gradient-to-l from-accent to-blue bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="text-xs text-text-dim mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStart}
          className="flex-1 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-dim transition-all text-white font-semibold glow-accent active:scale-[0.98]"
        >
          {hasProgress ? 'התחילי מחדש' : 'התחילי'}
        </button>
        {hasProgress && onContinue && (
          <button
            onClick={onContinue}
            className="flex-1 px-6 py-3.5 rounded-xl border border-border-strong bg-bg-elevated hover:bg-bg-panel transition-all text-text font-medium"
          >
            המשיכי מהמקום שעצרת
          </button>
        )}
      </div>

      <p className="mt-8 text-xs text-text-dim">
        כל המידע נשמר אצלך בדפדפן בלבד. אין שרת, אין tracking.
      </p>
    </div>
  );
}
