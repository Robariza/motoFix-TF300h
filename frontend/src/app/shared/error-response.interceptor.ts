import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(handleErrorResponse)
  );

  function handleErrorResponse(error: HttpErrorResponse) {
    const errorResponse = `Error: ${error.status}, message: ${error.message}`;
    console.error(errorResponse);
    return throwError(() => error.message);
  }
};
