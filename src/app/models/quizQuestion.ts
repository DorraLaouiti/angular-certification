export interface QuizQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    shuffled_answers?: { original: string; shuffled: string; index: number }[];
  }
