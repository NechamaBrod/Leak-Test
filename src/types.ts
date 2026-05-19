export type Category =
  | 'PII'
  | 'Secrets'
  | 'BusinessLogic'
  | 'Schema'
  | 'PromptInjection';

export type Choice = 'send' | 'filter';

export type CodeLanguage = 'js' | 'ts' | 'sql' | 'json' | 'env' | 'bash';

export interface Snippet {
  id: number;
  /** הקשר קצר: מה התלמידה מנסה לעשות כאן */
  scenario: string;
  /** קוד שייוצג כפי שהוא בקטע (LTR, מונוספייס) */
  code: string;
  language: CodeLanguage;
  /** התשובה הנכונה: לשלוח כמו שהוא או לסנן קודם */
  correctAnswer: Choice;
  /** שכבת האבטחה שהקטע בוחן */
  category: Category;
  /** מספרי שורות שזולגים (1-based) — להדגשה ב-feedback */
  leakedLines?: number[];
  /** מה דולף בפועל — bullets קצרים שיוצגו ב-feedback */
  leakedItems: string[];
  feedback: {
    correct: string;
    incorrect: string;
  };
  /** מקרה אמיתי / context נוסף — opt */
  realWorldExample?: string;
}

export type Phase = 'intro' | 'question' | 'feedback' | 'summary';

export interface AnswerRecord {
  snippetId: number;
  chosen: Choice;
  correct: boolean;
  category: Category;
}

export interface QuizState {
  phase: Phase;
  currentIndex: number;
  answers: AnswerRecord[];
}

export interface CategoryScore {
  category: Category;
  total: number;
  correct: number;
}
