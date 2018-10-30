import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

@Injectable()
export class ProvinceResolver implements Resolve<any>{

  constructor(private httpClient: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.httpClient.get(environment.apiUrl + '/provinces')
    .pipe( map(response => response ));
  }
}
