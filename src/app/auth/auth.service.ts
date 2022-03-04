import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    token:string| undefined;

    constructor(private http: HttpClient,private router: Router){}

    login(body:{'username':string, 'password':string}){
        return this.http.post<{"token":string}>('http://127.0.0.1:8000/api/get-token',body)
        // .subscribe(token => {this.token = token.token;console.log(token)})
        // this.router.navigate(['posts'])
    }
}