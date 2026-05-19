import type {
  AnswerRecord,
  CategoryScore,
  Choice,
  QuizState,
  Snippet,
} from '../types';
import { CATEGORIES } from '../data/categories';

export const STORAGE_KEY = 'leaktest:progress:v1';

export const initialState: QuizState = {
  phase: 'intro',
  currentIndex: 0,
  answers: [],
};

export type QuizAction =
  | { type: 'START' }
  | { type: 'ANSWER'; snippet: Snippet; chosen: Choice }
  | { type: 'NEXT'; total: number }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: QuizState };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return { ...state, phase: 'question', currentIndex: 0, answers: [] };

    case 'ANSWER': {
      // אם כבר ענתה על הקטע הזה — לא משכפלים
      if (state.answers.some((a) => a.snippetId === action.snippet.id)) {
        return { ...state, phase: 'feedback' };
      }
      const record: AnswerRecord = {
        snippetId: action.snippet.id,
        chosen: action.chosen,
        correct: action.chosen === action.snippet.correctAnswer,
        category: action.snippet.category,
      };
      return { ...state, phase: 'feedback', answers: [...state.answers, record] };
    }

    case 'NEXT': {
      const next = state.currentIndex + 1;
      if (next >= action.total) {
        return { ...state, phase: 'summary' };
      }
      return { ...state, phase: 'question', currentIndex: next };
    }

    case 'RESET':
      return initialState;

    case 'HYDRATE':
      return action.state;

    default:
      return state;
  }
}

export function computeCategoryScores(answers: AnswerRecord[]): CategoryScore[] {
  return CATEGORIES.map((category) => {
    const relevant = answers.filter((a) => a.category === category);
    return {
      category,
      total: relevant.length,
      correct: relevant.filter((a) => a.correct).length,
    };
  });
}
