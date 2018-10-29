import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';
import { Headers, ResponseContentType } from '@angular/http';
import { Response, RequestOptions } from '@angular/http';

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

  getFile(userId: number): Observable<Blob> {
    const options = new RequestOptions({responseType: ResponseContentType.Blob});
    return this.http.get(environment.apiUrl + '/orders/create-pdf/' + userId, options).map((response: Response) => <Blob>response.blob());
  }

}
