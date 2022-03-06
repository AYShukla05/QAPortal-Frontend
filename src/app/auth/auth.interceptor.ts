import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable() 
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService){}
    token:string = ''
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization',`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2NDc4NDQ3LCJpYXQiOjE2NDY0NzgxNDcsImp0aSI6ImVhMWRkNzkwNzhjZDQxOWM4NTIxOTI2YjQwMDYwMjBmIiwidXNlcl9pZCI6MX0.p2j-PLwlGYTPKlLOHFl64fV-3SXof_SYpGTcV5H_SnY`)
    })
    return next.handle(modifiedRequest);
}
 

}
 
