import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProfilesService } from "../profile/profiles.service";

@Injectable({
    providedIn: 'root'
  })
export class SubscriptionService{
    subscribedUsers:any[] = []
    constructor(private http: HttpClient){}

    getSubscribedUsers(){
        return this.http.get<any[]>('http://127.0.0.1:8000/api/get-subscribed')
        
        }

}