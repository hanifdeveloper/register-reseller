import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';

@Injectable()
export class CityService {

  constructor(private http: Http) { }

  getCityByProvinceId(id) {
    return this.http.get(environment.apiUrl + '/cities/province/' + id)
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

}