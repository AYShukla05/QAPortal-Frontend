import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SubscriptionService } from "../subscriptions/subscriptions.service";
import { ModalService } from "../modal/modal.service";
import { BehaviorSubject } from "rxjs";
import { Profile } from "../profile/profile.model";
import { backEndURL } from "../config";



@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    isError: boolean = false
    token:string | null=localStorage.getItem('token');
    isAuthenticated: boolean = false
    isLoggedIn:boolean = false
    loginChanged = new BehaviorSubject(false)
    readNotification = new BehaviorSubject(0)
    loggedProfile!:any
    message = ''
    url = backEndURL
    constructor(private http: HttpClient,
        private router: Router,
        private subscriptionService: SubscriptionService, 
        public modalService: ModalService
        ){

    }

    verify(profile: Profile){
      this.loggedProfile = profile
      console.log(this.loggedProfile)
      localStorage.setItem('Profile',JSON.stringify(this.loggedProfile))
    }

    login(body:{'username':string, 'password':string}){
        this.http.post<{"access":string, "refresh":string}>(
          this.url+'token',body)
        .subscribe(
            token=>{
                this.token = token.access;
                localStorage.setItem('token',this.token)
                this.isLoggedIn = true
                this.loginChanged.next(true)
                setTimeout(()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('Profile');
                    this.router.navigate(['login']);
                    this.isLoggedIn= false
                    this.loginChanged.next(false)

                }, 86400000 )
                
                // Get Profile Details
                this.http.get(this.url+ 'profile')
                .subscribe(
                    {
                    next: 
                    (response:{})=>{
                        localStorage.setItem('Profile',JSON.stringify(response))
                        this.loggedProfile = response
                        this.isAuthenticated = this.loggedProfile.is_verified
                        console.log(this.loggedProfile, this.isAuthenticated)
                        this.router.navigate(['/posts'])
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

                // Get unread notifications Count
                this.http.get<{'unreadNotification':number}>(
                  this.url + 'get-unread-notifications-count').subscribe(
                  response => {
                    this.readNotification.next(response['unreadNotification'])
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
        this.loginChanged.next(this.token !== null?true:false)
        const temp = localStorage.getItem('Profile')
        if (this.token!=null && temp!=null) {
          this.loggedProfile = JSON.parse(temp)
          this.isAuthenticated = this.loggedProfile.is_verified
          console.log(this.isAuthenticated, this.loggedProfile, this.isLoggedIn)
            this.subscriptionService.getSubscribedUsers().subscribe(
                (users:any[]) => {
                    this.subscriptionService.subscribedUsers = users
                  }, error =>{
                    this.handleError(error)
                }
            )
            this.http.get<{'unreadNotification':number}>(
              backEndURL+'get-unread-notifications-count').subscribe(
              response => {
                this.readNotification.next(response['unreadNotification'])
              }
            )
            
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn= false;
        this.loginChanged.next(false)
        this.token = null;
        localStorage.removeItem('Profile');
        this.router.navigate(['login']);
    }

    forgotPassword(formValue:{}){
      return this.http.post<{'message':string}>(this.url + 'forgot-password',formValue)
    }
    resetPassword(formValue:{}, id:string){
      this.http.post(this.url + 'reset-password/'+id,formValue).subscribe()
      this.router.navigate(['login']);
    }

    handleError(
      error:{'status':number, 
      'message':string, 
      'statusText':string, 
      'error':{'details':{'message':string}}
    }) 
    {
        this.isError = true;
        switch(error.status)
        {case 0:
          this.message="Server is Down"
          console.log(error)
          


          break;
          case 400: 
          this.message= error.error.details['message']
          console.log(error)
          
          break
          case 401: 
        this.isLoggedIn = false
        this.loginChanged.next(false)
        console.log(error)
        


          this.message= (typeof error.error.details['message'] != "string")?"Please Log in with proper credentials":error.error.details['message']
          
          this.router.navigate(['login']);

          break
          case 403: 

        this.message= (typeof error.error.details['message'] != "string")?"User does not have Permission. Login with proper credentials":error.error.details.message
        console.log(error)
          

          break
          case 404:
            this.message= (typeof error.error.details['message'] != "string")?"URL not found":error.error.details.message
            console.log(error)
            

            break
            case 500: 
            this.message= (typeof error.error.details['message'] != "string")?"Internal Server Error":error.error.details.message
            console.log(error)
            break
            default:
              

        }
        
        this.modalService.open('error')
        
      }
}