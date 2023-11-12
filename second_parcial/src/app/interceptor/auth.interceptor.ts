export interface AuthInterceptor {
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
/* import { LoaderService } from '../public/loader.service';
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {console.log("Hola")}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Intercepting request:', request);

    /* this.load.setActive(); */

    let cloneReq = request;

    cloneReq = request.clone(
      {
        setHeaders:{
          Authorization: 'Bearer ' + localStorage.getItem("access_token")
        }
      }
    )

    return next.handle(cloneReq).pipe(
      finalize(()=>{
        /* this.load.setInactive(); */
        console.log("access");
      })
    );
  }
}