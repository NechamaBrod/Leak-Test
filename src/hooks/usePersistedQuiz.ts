import { useEffect, useReducer, useRef } from 'react';
import type { QuizState } from '../types';
import { initialState, quizReducer, STORAGE_KEY } from '../state/quizReducer';

function loadState(): QuizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as QuizState;
    // ולידציה מינימלית
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('phase' in parsed) ||
      !Array.isArray(parsed.answers) ||
      !Array.isArray((parsed as QuizState).order)
    ) {
      return initialState;
    }
    return parsed;
  } catch {
    return initialState;
  }
}

export function usePersistedQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState, loadState);
  const hydrated = useRef(false);

  useEffect(() => {
    // לא לשמור את ה-state ההתחלתי מחדש על mount
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage לא זמין — ממשיכים בלי persistence
    }
  }, [state]);

  return [state, dispatch] as const;
}
