import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {
  questionTitle: String;
  questionDescription: String;
  testcases: Array<any> = [{description: '', stdin: 0, expectedOutput: 0}];
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
  }
  addTestCases() {
    this.testcases.push({
      description: '', stdin: 0, expectedOutput: 0
    });
  }
  removeTestCases(i: number) {
    if(this.testcases.length > 1){
      this.testcases.splice(i, 1);
    }
  }
  addQuestion() {
    const Question = {
      title:  this.questionTitle,
      description: this.questionDescription,
      testcases: this.testcases
    };
    console.log(Question);
    this.http.post('http://localhost:3000/api/code/addQuestion', Question).subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin']);
    })
  }
}
