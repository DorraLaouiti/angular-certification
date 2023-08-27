import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.scss'],
})
export class DisplayResultsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  questions!: string[];
  selectedAnswers!: string[];
  shuffledAnswers!: { original: string; shuffled: string; index: number }[][];
  correctAnswers!: string[];

  redirectToQuizCreation() {
    this.router.navigate(['/']);
  }
  ngOnInit() {
    const questionsString = this.route.snapshot.queryParamMap.get('questions');
    const selectedAnswersString =
      this.route.snapshot.queryParamMap.get('selectedAnswers');
    const shuffledAnswersString =
      this.route.snapshot.queryParamMap.get('answersChoices');
    const correctAnswersString =
      this.route.snapshot.queryParamMap.get('correctAnswers');

    this.questions = JSON.parse(questionsString || '{}');
    this.selectedAnswers = JSON.parse(selectedAnswersString || '{}');
    this.shuffledAnswers = JSON.parse(shuffledAnswersString || '{}');
    this.correctAnswers = JSON.parse(correctAnswersString || '{}');

    console.log('answers', this.shuffledAnswers);
    console.log('correct answers', this.correctAnswers);
    console.log('selected', this.selectedAnswers);
    console.log('questions', this.questions);
  }

  getScoreColor(): string {
    const correctCount = this.selectedAnswers.reduce(
      (count, answer, index) =>
        answer === this.correctAnswers[index] ? count + 1 : count,
      0
    );

    if (correctCount <= 1) {
      return 'red';
    } else if (correctCount <= 3) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
  getCorrectAnswersCount(): number {
    return this.selectedAnswers.filter(
      (answer, index) => answer === this.correctAnswers[index]
    ).length;
  }
}
