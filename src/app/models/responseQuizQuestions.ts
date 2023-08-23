import { QuizQuestion } from './quizQuestion';

export interface ResponseQuizQuestions {
  response_code: number;
  results: QuizQuestion[];
}
