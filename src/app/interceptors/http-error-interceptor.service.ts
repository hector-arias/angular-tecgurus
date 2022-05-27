import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService extends HttpErrorResponse {

  constructor(private toastrService: ToastrService) {super(toastrService);}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
     return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          let errorType = 'Error';
          //Error del lado del cliente
          if(error.error instanceof ErrorEvent){
            errMsg = `Error: ${error.error.message}`;
          } else { //Error del servidor
            if (error.status === 0){
              errMsg = `${error.status}, "No hay conexión con el servidor"`;
              errorType = 'Error critico';
            }else{
              errMsg = `${error.status} : ${error.error}`;
            }
            this.toastrService.error(errMsg, errorType, {closeButton:true})
          }
       console.log(error.error.message);
       return throwError(error);
     }));
   }
}
