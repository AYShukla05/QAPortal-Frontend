import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { subscriptionService } from '../subscriptions/subscriptions.service';

import { Profile } from "./profile.model";
import { Router } from "@angular/router";

@Injectable( {providedIn: 'root'})
export class ProfilesService{
    profiles: Profile[] = []
    constructor(private http: HttpClient,private router: Router,private subscriptionService:subscriptionService){}
    profile: any
    subscribedUsers: Profile[] = []




    getProfiles(){
        return this.http.get<Profile[]>('http://127.0.0.1:8000/api/profiles')
    }

    getProfile(id:string){
        let profile = this.profiles.filter(p => p.id == id)
        return profile[0]
    }

    getProfileAsync(id:string){
        return this.http.get('http://127.0.0.1:8000/api/profiles/'+id)
    }

    createProfile(profile:{ "first_name": string;
    "username": string;
    "email":  string;
    "password":  string;
    "password2":  string;}
    ){
        this.http.post('http://127.0.0.1:8000/api/create-profile',profile).subscribe()
        this.router.navigate(['profiles'])
    }


    updateProfile(id:string,profile:{ "first_name": string;
    "username": string;
    "email":  string;
    "password":  string;
    "password2":  string;}){
        const updatedProfileId = id
        const updatedProfile = profile
        this.http.put('http://127.0.0.1:8000/api/update-profile/'+updatedProfileId,updatedProfile)
    .subscribe()
    this.router.navigate(['profiles'])
    }

    
    deleteProfile(id:string){
        this.http.delete('http://127.0.0.1:8000/api/delete-profile/'+id).subscribe()
        this.router.navigate(['profiles'])
    }


    subscribeProfile(profileId:string){
        const profId = {'id':profileId}
        this.http.post('http://127.0.0.1:8000/api/subscribe',profId).subscribe()
        this.subscriptionService.getSubscribedUsers()
        this.router.navigate(['profiles'])
    }

    getMyProfile(){
        return this.http.get<{"Profile":{'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}>('http://127.0.0.1:8000/api/get-my-profile')
    }


}
