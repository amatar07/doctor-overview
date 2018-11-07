import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
/**
 * Authentication for every request we are sending
 */
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let username: string = 'testday@teleclinic.com';
    let password: string = 'p4ssw0rd';
    let basePass = btoa(username+':'+password);
   
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Basic ' + basePass,
      },
    });

    return next.handle(req);
  }
}