import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    token:string | null=localStorage.getItem('token');
    isLoggedIn = false;
    expiration!: Date;
    profile:any
    constructor(private http: HttpClient,private router: Router){}

    login(body:{'username':string, 'password':string}){
        this.http.post<{"access":string, "refresh":string}>('http://127.0.0.1:8000/api/token',body)
        .subscribe(token => {
            this.token = token.access;
            this.expiration = new Date()
            console.log(token)
            console.log(this.expiration)
            localStorage.setItem('token',this.token)
            this.isLoggedIn=true
            this.http.get('http://127.0.0.1:8000/api/profile')
            .subscribe(
                (response)=>{
                    console.log("Response",response)
                    localStorage.setItem('Profile',JSON.stringify(response))})
            this.router.navigate(['/my-profile'])}
            
            )
        // console.log(this.token)
    }

    autoLogin(){
        this.token = localStorage.getItem('token')
        this.isLoggedIn = true
        const temp = localStorage.getItem('Profile')
        if (temp!=null){
            this.profile = JSON.parse(temp)
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.token = null;
        localStorage.removeItem('Profile');
        this.router.navigate(['login']);
    }

}