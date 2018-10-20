import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  createReseller(user: string) {
    return this.http.post(environment.apiUrl + '/users/register', user)
      .pipe(
        map(response => response.json()),
        take(1)
      )
      .catch(
          (error: Response ) => {
              throw error;
          }
      );
  }

  checkUsername(username: string) {
    return this.http.post(environment.apiUrl + '/users/check-username', { username: username})
      .pipe(
        map(response => response.json())
      )
      .catch(
          (error: Response ) => {
              throw error;
          }
      );
  }

  checkEmail(email: string) {
    return this.http.post(environment.apiUrl + '/users/check-email', { email: email})
      .pipe(
        map(response => response.json())
      )
      .catch(
          (error: Response ) => {
              throw error;
          }
      );
  }

}
