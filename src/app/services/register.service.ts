import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class RegisterService {

  constructor(private httpClient: HttpClient, private http: Http) { }

  createReseller(user: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/users/register', user)
      .pipe(
        map(response => response)
      );
  }

  checkUsername(username: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/users/check-username', { username: username})
      .pipe(
        map(response => response)
      );
  }

  checkEmail(email: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/users/check-email', { email: email})
      .pipe(
        map(response => response)
      );
  }

  getFile(userId: number): Observable<Blob> {
    // const options = new RequestOptions({responseType: ResponseContentType.Blob});
    // tslint:disable-next-line:max-line-length
    // return this.http.get(environment.apiUrl + '/orders/create-pdf/2616', options).map((response: Response) => <Blob>response.blob());

    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(environment.apiUrl + '/orders/create-pdf/' + userId, { responseType: 'blob' }).pipe( map(response => response));

  }

  getOngkir(cityOrigin = null, cityDest = null, weight, courier): Observable<any> {
    const data = {
      origin: cityOrigin,
      originType: 'city',
      destination: cityDest,
      destinationType: 'city',
      weight: weight,
      courier: courier
    };
    return this.httpClient.post(environment.apiUrl + '/couriers/cost-shipping/with-courier', data)
    .pipe(
      map(response => response)
    );
  }

}
