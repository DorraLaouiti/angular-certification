import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { DisplayResultsComponent } from './display-results/display-results.component';

const routes: Routes = [
  { path: "", component: QuizMakerComponent },
  { path: "results", component: DisplayResultsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
