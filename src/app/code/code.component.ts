import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'text'};
  code: string= '#type_your_code_here';
  stdin: any;
  languageList = [];
  currentLanguageId: number;
  token: any;
  output: any;
  id: any;
  question: any;
  testcases: any;
  result: any;
  score = 0;
  submitedCode: any;
  i = 0;
  testcaseResultArray = [];
  testcaseResult: {
    info: any,
    isCorrect: boolean;
  };
  constructor(private router: Router, private http: HttpClient, public activeRoute: ActivatedRoute, private authService: AuthenticationService) {
    this.activeRoute.data.subscribe(data => this.question = data);
    console.log(this.question);
    this.testcases =  this.question.question.question[0].testcases;
  }

  ngOnInit() {


    this.http.get('http://localhost:3000/api/code/languages').subscribe((res: any) => {
      this.languageList = res.languages;

    });
  }
onlanguageSelect(id) {
  this.currentLanguageId = id;
  console.log(this.currentLanguageId);
}

 onSubmit() {
  const data = {
    id: this.currentLanguageId,
    code: this.code,
    console: this.stdin
  };
  console.log(data);
  this.http.post('http://localhost:3000/api/code/submission', data).subscribe((res: any) => {
  console.log(res);
  this.token = res;
  this.checkOutput();

  });

}
checkOutput() {
  const token = {
    token: this.token
  }
  this.http.post('http://localhost:3000/api/code/output', token).subscribe( res => {
  this.result = res;
  this.result = JSON.parse(this.result.output);
  console.log(this.result);
  if (this.result.status.id === 1 || this.result.status.id === 2) {
    this.checkOutput();
  } else {
    this.output = this.result;
  }
  });
}
checkstatus() {

this.http.get('http://localhost:3000/api/code/status').subscribe( res => {
  console.log(res);
  });
}
onComplete() {
    const data = {
      id: this.currentLanguageId,
      code: this.code,
      console: this.question.question.question[0].testcases[this.i].input
    };
    this.submitedCode = this.code;
    console.log(data);
    this.http.post('http://localhost:3000/api/code/submission', data).subscribe((res: any) => {
    console.log(res);
    this.token = res;
    this.checktestcases();
  });

}
checktestcases() {
  const token = {
    token: this.token
  };
  console.log("checking test case");
  this.http.post('http://localhost:3000/api/code/output', token).subscribe( res => {
  this.result = res;
  this.result = JSON.parse(this.result.output);
  console.log(this.result.status);
  if (this.result.status.id === 1 || this.result.status.id === 2) {
    this.checktestcases();
  } else {
    this.testcaseResultArray.push({info: this.result, status: false});
    console.log(this.testcaseResultArray);
    if (this.i !== this.question.question.question[0].testcases.length - 1) {
      this.i = this.i + 1;

      this.onComplete();
    } else if (this.i === this.question.question.question[0].testcases.length - 1) {
      console.log('checking test 2');
      this.testcaseResultArray.forEach((items, index) => {
        console.log(index);
        console.log(this.question.question.question[0].testcases[index].output);
        if ( this.question.question.question[0].testcases[index].output === items.info.stdout) {
          this.score = this.score + 10;
          items.isCorrect = true;
        } else {
          items.isCorrect = false;
        }
      });
      console.log(this.testcaseResultArray);
      const sollution = {
        question: this.activeRoute.snapshot.paramMap.get('id'),
        teamId: this.authService.id,
        code: this.submitedCode,
        score: this.score
      };
      this.http.put('http://localhost:3000/api/code/submitSolution', sollution).subscribe(responce => {

        console.log(responce);
        this.testcaseResultArray = [];
      });
    }

  }
  });
}
}
