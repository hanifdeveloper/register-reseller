import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';

@Injectable()
export class CityService {

  constructor(private http: HttpClient) { }

  getCityByProvinceId(id): Observable<any> {
    return this.http.get(environment.apiUrl + '/cities/province/' + id)
      .pipe(
        map(response => response),
        take(1)
      )
      .catch(
          (error: Response ) => {
            throw error;
          }
      );
  }

}
