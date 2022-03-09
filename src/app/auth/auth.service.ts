import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    token:string | null=localStorage.getItem('token');
    isLoggedIn:boolean = false;
    expiration!: Date;
    loggedProfile:any
    constructor(private http: HttpClient,private router: Router){}

    login(body:{'username':string, 'password':string}){
        this.http.post<{"access":string, "refresh":string}>('http://127.0.0.1:8000/api/token',body)
        .subscribe(token => {
            this.token = token.access;
            // this.expiration = new Date()
            console.log(token)
            // console.log(this.expiration)
            localStorage.setItem('token',this.token)
            this.isLoggedIn=true
            this.http.get('http://127.0.0.1:8000/api/profile')
            .subscribe(
                (response)=>{
                    console.log("Response",response)
                    localStorage.setItem('Profile',JSON.stringify(response))
                    this.loggedProfile = response
                    this.router.navigate(['/my-profile'])
                },
                (error)=>{
                    console.log(error)
                })
            }, (error)=>{
                console.log(error)
            })
            
    }

    autoLogin(){
        this.token = localStorage.getItem('token')
        this.isLoggedIn = this.token !== null?true:false
        // this.LoginChanged.emit(this.isLoggedIn)
        // console.log(this.LoginChanged)

        const temp = localStorage.getItem('Profile')
        if (temp!=null){
            this.loggedProfile = JSON.parse(temp)
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        // this.LoginChanged.emit(this.isLoggedIn)
        // console.log(this.LoginChanged)
        this.token = null;
        localStorage.removeItem('Profile');
        this.router.navigate(['login']);
    }

}