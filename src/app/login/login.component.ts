import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  email: any;
  password: any;
  private authListenerSub: Subscription;
  private loggedin = false;
  constructor( public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }
signup(name, email, password) {
console.log(name + email + password);
this.authService.createUser(email, password, name);
}
login(email, password) {
  this.authService.login(email, password);
  this.authListenerSub = this.authService.getauthStatusListener().subscribe(
    isAuthenticated => {
    this.loggedin = isAuthenticated;
    console.log(this.loggedin);
    if (this.loggedin) {
      this.authService.Userlogin = true;
      this.router.navigate(['/code']);
    }
  });
}
}
