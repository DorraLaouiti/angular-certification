import { Component, OnInit } from '@angular/core';
import { TriviaCategory } from '../models/triviaCategory';
import { HttpService } from '../service/http.service';
import { map } from 'rxjs';
import { ResponseTriviaCtageories } from '../models/responseTriviaCategories';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent implements OnInit {
  categories!: TriviaCategory[];
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getListCategories();
  }

  getListCategories() {
    this.http.getListTriviaCategories().subscribe((response) => {
      this.categories = response.trivia_categories;
    });
  }

  createTrivia() {}
}
