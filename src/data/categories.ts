import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  'PII',
  'Secrets',
  'BusinessLogic',
  'Schema',
  'PromptInjection',
];

export const CATEGORY_META: Record<
  Category,
  { label: string; short: string; description: string; recommendation: string }
> = {
  PII: {
    label: 'מידע אישי מזהה',
    short: 'PII',
    description: 'שמות, אימיילים, טלפונים, ת"ז, כתובות — כל מה שמזהה אדם פרטי.',
    recommendation:
      'הסירי או החליפי שדות מזהים בערכי דמה לפני שליחה למודל. אל תשלחי DB rows גולמיים.',
  },
  Secrets: {
    label: 'סודות ומפתחות',
    short: 'Secrets',
    description: 'API keys, tokection strings, סיסמאות, קבצי .env.',
    recommendation:
      'לעולם אל תדביקי .env, headers של auth, או strings שמכילים sk-/Bearer. השתמשי ב-secret scanning.',
  },
  BusinessLogic: {
    label: 'לוגיקה עסקית',
    short: 'Business Logic',
    description: 'אלגוריתמי תמחור, נוסחאות פנימיות, IP של החברה.',
    recommendation:
      'הפרידי את הלוגיקה הקניינית. בקשי עזרה ב-pattern גנרי במקום לשתף את הקוד המקורי.',
  },
  Schema: {
    label: 'סכמת מסד נתונים',
    short: 'Schema',
    description: 'מבנה טבלאות מלא, שמות שדות פנימיים, indexes ויחסים.',
    recommendation:
      'שתפי רק את השדה הרלוונטי, לא את כל ה-CREATE TABLE. סכמה מלאה היא מפת דרכים לתוקף.',
  },
  PromptInjection: {
    label: 'הזרקת פרומפט',
    short: 'Prompt Injection',
    description: 'קלט משתמש או תוכן חיצוני שמועברים ישירות לפרומפט.',
    recommendation:
      'הפרידי תמיד system/user, סננו קלט, השתמשי ב-structured outputs. תוכן חיצוני = לא מהימן.',
  },
};
