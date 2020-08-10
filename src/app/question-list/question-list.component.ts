import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
Questions: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/code/questions').subscribe((responce:any) => {
      console.log(responce);
      this.Questions = responce.questions;
    });
  }
  deleteQuestion(id) {
    this.http.get('http://localhost:3000/api/code/removeQuestion' + id).subscribe(res => {
      console.log(res);
      this.http.get('http://localhost:3000/api/code/questions').subscribe((responce:any) => {
        console.log(responce);
        this.Questions = responce.questions;
      });
    });
  }
}
