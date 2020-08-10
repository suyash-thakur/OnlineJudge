import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CodeComponent } from './code/code.component';
import { AdminComponent } from './admin/admin.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { QuestionResolver } from './question.resolver';


const routes: Routes = [
  {path:'', component: ProblemListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'code/:id', component: CodeComponent, resolve: {question: QuestionResolver}},
  {path: 'admin', component: AdminComponent, children: [{
    path: 'addQuestion', component: AddquestionsComponent
  },
{
  path: '', component: QuestionListComponent
}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
