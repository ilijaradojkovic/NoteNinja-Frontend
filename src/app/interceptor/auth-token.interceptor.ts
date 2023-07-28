import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('auth')) {
      let token = localStorage.getItem("access_token");
      request = request.clone({
        headers: request.headers.set("authorization", `Bearer ${token}`)
      })
    }
    return next.handle(request);
  }
}

export  const AuthInterceptor={
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true
};
