import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from './core/error/error.service';
import { environment } from 'src/environments/environment.development';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private readonly API_PREFIX = '/api';

  constructor(private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Rewrite API URL and ensure credentials are sent
    if (req.url.startsWith(this.API_PREFIX)) {
      req = req.clone({
        url: req.url.replace(this.API_PREFIX, apiUrl),
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Let components/guards decide how to handle unauthorized responses
          console.warn('Unauthorized request intercepted:', err.message);
        } else {
          // Forward other errors to a global error service
          this.errorService.setError(err);
        }

        return throwError(() => err);
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
