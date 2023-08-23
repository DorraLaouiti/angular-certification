import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TriviaCategory } from '../models/triviaCategory';
import { ResponseTriviaCtageories } from '../models/responseTriviaCategories';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl: string = 'https://opentdb.com';

  constructor(private http: HttpClient) {}

  getListTriviaCategories(): Observable<ResponseTriviaCtageories> {
    return this.http.get<ResponseTriviaCtageories>(`${this.baseUrl}/api_category.php`);
  }
}
