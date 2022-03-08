import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class subscriptionService{
    subscribedUsers:any[] = []
    constructor(private router: Router){}

    getSubscribedUsers(){
        const data = {}
        return 
        // .subscribe(
        //     (users)=>
        //     this.subscribedUsers = users
        // )
    }
}