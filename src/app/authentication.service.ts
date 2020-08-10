import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;
  id: string;
  Userlogin: boolean;
  private tokenTimer: any;
  timer: any;
  userdata: any;


  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string, name: string): Promise<any> {
    return Promise.resolve((() => {

      const authData = {email, password, name };
      this.http.post('http://localhost:3000/api/auth/signup', authData)
    .subscribe(response => {
        console.log(response);
    });
      return 'from first'; // return whatever you want not neccessory
  })());
}
login(email: string, password: string): Promise<any> {

  return Promise.resolve((() => {
    // code here
    const authData = {email: email, password: password};
    console.log(authData);
    this.http.post<{token: string; expiresIn: number}>('http://localhost:3000/api/auth/login', authData)
    .subscribe(response => {
      console.log(response);

      const token = response.token;
      this.token = token;
      console.log(this.token);
      this.authStatusListener.next(true);
      this.user = helper.decodeToken(token);
      this.saveAuthData(token, this.user.exp);

      console.log(this.user.exp);
      this.id = this.user.userId;
      console.log(this.user);
      console.log(this.id);

    });
    return 'from second'; // return whatever you want not neccessory
})());
}





logout() {
this.token = null;
this.Userlogin = false;
this.authStatusListener.next(false);
this.clearAuthData();
console.log('logout');
}


private saveAuthData(token: string, expiration: string ) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expiration);

}

private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');


}


private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  if (!token || !expirationDate) {
    console.log('error!');

    return;
  }
  return {
    token,
    expirationDate


  };
}


autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    console.log('error');

    return;
  }
  const now = new Date();
  const datenow = now.getTime();
  const date = Number(authInformation.expirationDate) * 1000;
  const expiresIn = date - now.getTime();
  console.log(date);
  console.log(datenow);


  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.Userlogin = true;
    this.user = helper.decodeToken(this.token);
    this.id = this.user.userId;

    this.authStatusListener.next(true);
    console.log(this.id);
    console.log('loggedIn');
    // this.router.navigate(['/code']);
  } else {
    console.log('error');
  }
}
getToken() {
  return this.token;
}
getauthStatusListener() {
  return this.authStatusListener.asObservable();
}


}
