import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class subscriptionService{
    subscribedUsers:any[] = []
    constructor(private http: HttpClient,private router: Router){}

    getSubscribedUsers(){
        const data = {}
        return this.http.get<any[]>('http://127.0.0.1:8000/api/get-subscribed',data)
        // .subscribe(
        //     (users)=>
        //     this.subscribedUsers = users
        // )
    }
}