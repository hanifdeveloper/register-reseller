import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ProvinceService {

  constructor(private http: Http) { }

  searchProvince(query) {
    return this.http.get(environment.apiUrl + '/provinces/search-bysubdistrict/' + query)
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
