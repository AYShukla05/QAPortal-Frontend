import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    token:string | null=localStorage.getItem('token');
    expiration!: Date;

    constructor(private http: HttpClient,private router: Router){}

    login(body:{'username':string, 'password':string}){
        this.http.post<{"access":string, "refresh":string}>('http://127.0.0.1:8000/api/token',body)
        .subscribe(token => {
            this.token = token.access;
            this.expiration = new Date()
            //  + (5*24*60*60*1000)
            console.log(token)
            console.log(this.expiration)
            localStorage.setItem('token',JSON.stringify(this.token))
            this.router.navigate(['posts'])}
            
            )
        // console.log(this.token)
    }

}