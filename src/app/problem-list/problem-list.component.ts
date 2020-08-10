import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  Questions: any;

  constructor(private http: HttpClient, public router: Router) {
    this.http.get('http://localhost:3000/api/code/problemPreview').subscribe((responce:any) => {
      this.Questions = responce.question;
    });
   }

  ngOnInit() {

  }
  solve(id) {
    this.router.navigate(['/code', id]);
  }
}
