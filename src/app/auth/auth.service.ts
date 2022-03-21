import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SubscriptionService } from "../subscriptions/subscriptions.service";
import { ModalService } from "../modal/modal.service";
// import { BehaviorSubject } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    isError: boolean = false
    token:string | null=localStorage.getItem('token');
    isLoggedIn:boolean = false
    // new BehaviorSubject<boolean>(false);
    // isAuthenticated:boolean = false;
    loggedProfile:any
    message = ''

    constructor(private http: HttpClient,
        private router: Router,
        private subscriptionService: SubscriptionService, 
        public modalService: ModalService
        ){

    }

    login(body:{'username':string, 'password':string}){
        this.http.post<{"access":string, "refresh":string}>('http://127.0.0.1:8000/api/token',body)
        .subscribe(
            token=>{
                this.token = token.access;
                // console.log(token)
                localStorage.setItem('token',this.token)
                this.isLoggedIn = true
                // this.isLoggedIn = true
                setTimeout(()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('Profile');
                    this.router.navigate(['login']);
                    this.isLoggedIn= false
                    // this.isLoggedIn = false
                }, 86400000 )
                
                
                this.http.get('http://127.0.0.1:8000/api/profile')
                .subscribe(
                    {
                    next: 
                    response=>{
                        // console.log("Response",response)
                        localStorage.setItem('Profile',JSON.stringify(response))
                        this.loggedProfile = response
                        // console.log(this.router)
                        this.router.navigate(['/my-profile'])
                        this.subscriptionService.getSubscribedUsers().subscribe(
                            (users:any[]) => {
                                this.subscriptionService.subscribedUsers = users
                              }, error =>{
                                this.handleError(error)
                            }
                        )
                        
                    },     
                    error: 
                    error => { 

                        this.handleError(error)
                    },    
                }
                )
            },error=>{
                this.handleError(error)
            }
        )
        
}

    autoLogin() {
        this.token = localStorage.getItem('token')
        this.isLoggedIn= this.token !== null?true:false
        

        const temp = localStorage.getItem('Profile')
        if (this.token!=null && temp!=null) {
            this.loggedProfile = JSON.parse(temp)
            // console.log("Getting subscribed initial")
            this.subscriptionService.getSubscribedUsers().subscribe(
                (users:any[]) => {
                    this.subscriptionService.subscribedUsers = users
                  }, error =>{
                    this.handleError(error)
                }
            )
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn= false;
        this.token = null;
        localStorage.removeItem('Profile');
        this.router.navigate(['login']);
    }


    handleError(error:{'status':number, 'message':string, 'statusText':string, 'error':{'details':{'message':string}}}) {
        this.isError = true;
        switch(error.status)
        {case 0:
        //   console.log("Server is Down")
          this.message="Server is Down"
        //   console.log(error.error.details)
        //   console.log("Error", error)


          break;
          case 401: 
        //   console.log("Unauthorized")
          this.message="Please Log in with proper credentials"
          this.isLoggedIn = false
        //   console.log("Error Detail",error.error.details)
        //   console.log("Error", error)

          this.router.navigate(['login']);

          break
          case 403: 
        //   console.log("User does not have Permission. Login with proper credentials")
          this.message="User does not have Permission. Login with proper credentials"
        //   console.log("Error", error)

        //   console.log("Error Detail",error.error.details)
          break
          case 404:
            // console.log("URL not found")
            this.message="URL not found"
            // console.log("Error Detail",error.error.details)
            // console.log("Error", error)

            break
            case 500: 
            // console.log("Internal Server Error")
            this.message="Internal Server Error"
            // console.log("Error Detail",error.error.details)
            // console.log("Error", error)


        }
        this.modalService.open('error')
        
      }
}