import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';

@Injectable()
export class SubdistrictService {

  constructor(private http: Http) { }

  getByCityId(cityId) {
    return this.http.get(environment.apiUrl + '/subdistricts/city/' + cityId)
      .pipe(
        map(response => response.json()),
        take(1)
      )
      .catch(
          (error: Response ) => {
              return Observable.throw('Something went wrong ');
          }
      );
  }

}
