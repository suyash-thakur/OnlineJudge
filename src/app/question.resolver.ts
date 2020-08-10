import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable , of, EMPTY} from 'rxjs';
import { take, mergeMap, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: "root"
})
export class QuestionResolver implements Resolve<any> {
  constructor( private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('resolver called');
    return this.http.get('http://localhost:3000/api/code/question' + route.params.id).pipe(catchError(error   => {
      return EMPTY;
   }), mergeMap(something => {
         if (something) {
            return of(something);
         } else {
            return EMPTY;
         }
       })
     );
  }
}
