import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SubscriptionService{
    subscribedUsers:any[] = []
    constructor(private http: HttpClient){}
    url = 'http://127.0.0.1:8000/api/'

    getSubscribedUsers(){
        return this.http.get<any[]>(this.url+'get-subscribed')
     }

    subscribeProfile(profileId:string){
      const profId = {'id':profileId}
      return this.http.post(this.url+'subscribe',profId)
    }

    

}