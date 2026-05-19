# The Leak Test

Hook אינטראקטיבי לקורס Full Stack על אבטחת מידע ב-AI.
10 קטעי קוד → בחירה לכל קטע → דוח אישי לפי 5 שכבות אבטחה.

## הרצה

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # פלט ל-dist/
npm run preview
```

## עריכת תוכן

כל הקטעים והפידבק חיים בקובץ אחד:
[src/data/snippets.ts](src/data/snippets.ts)

המבנה (TypeScript-typed):

```ts
{
  id: number,
  scenario: string,          // 1–2 שורות הקשר
  code: string,              // קוד גולמי, LTR
  language: 'js' | 'ts' | 'sql' | 'json' | 'env' | 'bash',
  correctAnswer: 'send' | 'filter',
  category: 'PII' | 'Secrets' | 'BusinessLogic' | 'Schema' | 'PromptInjection',
  leakedLines?: number[],    // 1-based, להדגשת שורות ב-feedback
  leakedItems: string[],     // bullets של "מה היה דולף"
  feedback: { correct: string, incorrect: string },
  realWorldExample?: string  // אופציונלי
}
```

שיני רק את התוכן בקובץ. המבנה והקומפוננטות לא צריכים להשתנות.

## Deploy ל-Netlify

הקובץ [netlify.toml](netlify.toml) כבר מוגדר:
- build command: `npm run build`
- publish: `dist`
- SPA redirect

חברי repo ל-Netlify ולחצי Deploy. זהו.

## ארכיטקטורה

- **Vite + React 19 + TypeScript + Tailwind v4**
- **State:** `useReducer` יחיד (אין Redux/Zustand) — ב-[src/state/quizReducer.ts](src/state/quizReducer.ts)
- **Persistence:** localStorage תחת המפתח `leaktest:progress:v1` — ב-[src/hooks/usePersistedQuiz.ts](src/hooks/usePersistedQuiz.ts)
- **Syntax highlighting:** `prism-react-renderer` (runtime, אפס build cost)
- **Phases:** `intro → question → feedback → summary`
- **אין backend, אין tracking, אין auth.**

## עיצוב

- Dark only. רקע `#0a0a0f`, accent `#a855f7`, blue `#3b82f6`
- Heebo (UI) + JetBrains Mono (קוד)
- RTL כללי, קטעי קוד LTR
- Responsive: feedback panel נע מצד לתחתית במובייל
