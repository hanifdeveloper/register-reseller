import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';

@Injectable()
export class SubdistrictService {

  constructor(private http: HttpClient) { }

  getByCityId(cityId): Observable<any> {
    return this.http.get(environment.apiUrl + '/subdistricts/city/' + cityId)
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
