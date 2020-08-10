import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CodeComponent } from './code/code.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AdminComponent } from './admin/admin.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { ProblemListComponent } from './problem-list/problem-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CodeComponent,
    AdminComponent,
    AddquestionsComponent,
    QuestionListComponent,
    ProblemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
