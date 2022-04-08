import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { backEndURL } from "../config";

@Injectable() 
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router,
  private route: ActivatedRoute
    ){}
    id!: string
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const url = backEndURL
    const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization',`Bearer ${this.authService.token}`)
    })
    const exemptURLs = [
    url +"api/token",
    url +"api/create-profile", 
    url +"api/posts",
    url +"api/posts/",
    url +"api/profiles",
    url +"api/profiles/",
    url +"api/forgot-password",
    url +"api/reset-password",
    url + "api/verify"
  ]
   
    
  
  
  if(
    ((!req.url.includes('edit'))&&
    exemptURLs.some(url=>{return req.url.includes(url)}))||
    this.authService.token==null){
      console.log(req)
      return next.handle(req)
    }
    console.log(modifiedRequest)
    return next.handle(modifiedRequest)
    }

}
 
 
