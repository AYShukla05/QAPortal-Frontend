import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable() export class AuthInterceptorService implements HttpInterceptor {
 constructor(private authService: AuthService){}

 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token!=undefined) {
        // req = req.clone({ headers: req.headers.append('body',{'username':'admin','password':'admin'}) });
        req = req.clone({ headers: req.headers.set('Authorization', 'Token ' + this.authService.token) });

    }    
    return next.handle(req);
}
 

}
 
