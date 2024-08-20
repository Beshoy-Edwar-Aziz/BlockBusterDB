import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let Authorization=`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjk0ZmNmOTNmMGQ3MTE1MmFlNzM4YWY2NjU3MDkzZSIsInN1YiI6IjY1NTRjNzUxNTM4NjZlMDEzOWUxYjExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82Ix7WObD2Tg7ii578miN0AbGOGiBpJF_tROw0caTAM`
    let accept=`application/json`
    let requestHeaders= request.clone({
      headers:request.headers.set('accept',accept).set('Authorization',Authorization)
    })
    return next.handle(requestHeaders);
  }
}
