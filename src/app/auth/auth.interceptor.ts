import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

@Injectable() 
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router,
  private route: ActivatedRoute
    ){}
    id!: string
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization',`Bearer ${this.authService.token}`)
    })
    const exemptURLs = [
    "http://127.0.0.1:8000/api/token",
    "http://127.0.0.1:8000/api/create-profile", 
    "http://127.0.0.1:8000/api/posts",
    "http://127.0.0.1:8000/api/posts/",
    "http://127.0.0.1:8000/api/profiles",
    "http://127.0.0.1:8000/api/profiles/",
  ]
  // console.log("Excempt URLs",exemptURLs)
  // console.log("Request url", req.url)
  // console.log(exemptURLs.some(url=>{return req.url.includes(url)}))
    
  
  
  if(exemptURLs.some(url=>{return req.url.includes(url)})){
    // console.log("Sent Request", req)
      return next.handle(req)
    }
    // console.log("Modified Request",modifiedRequest)
    return next.handle(modifiedRequest)
    }

}
 
 
