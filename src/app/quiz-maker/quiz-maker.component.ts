import { Component, OnInit } from '@angular/core';
import { TriviaCategory } from '../models/triviaCategory';
import { HttpService } from '../service/http.service';
import { QuizQuestion } from '../models/quizQuestion';
import { ResponseQuizQuestions } from '../models/responseQuizQuestions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent implements OnInit {
  categories!: TriviaCategory[];
  quiz!: QuizQuestion[];
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  selectedCategory!: number;
  selectedDifficulty!: string;

  quizData!: ResponseQuizQuestions;
  currentQuestionIndex: number = 0;
  shuffledAnswers!: string[][];
  selectedAnswerIndex: number = -1;
  selectedQuestionIndex: number = -1;
  showSubmitButton: boolean = false;
  selectedAnswers!: number[];
  originalQuestionOrder: number[] = [];
  originalShownAnswersnOrder: string[] = [];
  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {
    this.getListCategories();
  }

  getListCategories() {
    this.http.getListTriviaCategories().subscribe((response) => {
      this.categories = response.trivia_categories;
    });
  }

  loadQuestions() {
    this.http
      .getListQuestions(
        this.selectedCategory,
        this.selectedDifficulty.toLocaleLowerCase()
      )
      .subscribe((response) => {
        this.quizData = response;
        this.quiz = response.results.map((question) => {
          const shuffledAnswers = this.shuffle([
            question.correct_answer,
            ...question.incorrect_answers,
          ]);
          const answersWithIndexes = shuffledAnswers.map((answer, index) => {
            return {
              original:
                question.incorrect_answers[index] === answer
                  ? question.correct_answer
                  : question.incorrect_answers[index],
              shuffled: answer,
              index: index,
            };
          });
          return { ...question, shuffled_answers: answersWithIndexes };
        });
        this.currentQuestionIndex = 0;
        this.originalQuestionOrder = [...Array(this.quiz.length).keys()];
        this.selectedAnswers = new Array(this.quiz.length).fill(-1);
        this.showSubmitButton = false;
      });
  }

  selectAnswer(questionIndex: number, answerIndex: number) {
    this.selectedAnswers[questionIndex] = answerIndex;
  }

  allQuestionsAnswered(): boolean {
    if (this.selectedAnswers) {
      return this.selectedAnswers.every((index) => index !== -1);
    }
    return false; // Return false if selectedAnswers is undefined
  }

  submitAnswers() {
    const submittedQuestions = this.originalQuestionOrder.map(
      (index) => this.quiz[index].question
    );
    const submittedCorrectAnswers = this.originalQuestionOrder.map(
      (index) => this.quiz[index].correct_answer
    );
    const submittedAnswers = this.selectedAnswers.map(
      (answerIndex, questionIndex) => {
        if (answerIndex !== -1) {
          return this.quiz[questionIndex].shuffled_answers![answerIndex]
            .shuffled;
        } else {
          return 'Not answered';
        }
      }
    );
    const submittedListofAnswers = this.selectedAnswers.map(
      (answerIndex, questionIndex) => {
        if (answerIndex !== -1) {
          return this.quiz[questionIndex].shuffled_answers;
        } else {
          return 'Not answered';
        }
      }
    );
    this.router.navigate(['/results'], {
      queryParams: {
        questions: JSON.stringify(submittedQuestions),
        selectedAnswers: JSON.stringify(submittedAnswers),
        answersChoices: JSON.stringify(submittedListofAnswers),
        correctAnswers: JSON.stringify(submittedCorrectAnswers),
      },
    });
    console.log('Submitted Questions:', submittedQuestions);
    console.log('Submitted Answers:', submittedAnswers);
    console.log('Submitted shuffeled list of Answers:', submittedListofAnswers);
    console.log('Submitted correct Answers:', submittedCorrectAnswers);
  }

  shuffle(array: string[]) {
    // Shuffle the array using Fisher-Yates algorithm
    let currentIndex = array.length,
      randomIndex: number,
      temporaryValue: string;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  createTrivia() {
    this.loadQuestions();
  }
}
