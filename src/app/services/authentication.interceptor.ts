import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('esps_auth_token');      
    if (token) {
      request = request.clone({
        setHeaders: {
          'X-Auth-Token': token,
        },
      });
    }

    return next.handle(request);
  }
}
