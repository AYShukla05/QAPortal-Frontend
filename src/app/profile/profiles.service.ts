import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SubscriptionService } from '../subscriptions/subscriptions.service';

import { Profile } from "./profile.model";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Injectable( {providedIn: 'root'})
export class ProfilesService{
    profiles: Profile[] = []
    constructor(private http: HttpClient,
        private router: Router,
        private subscriptionService:SubscriptionService,
        private authService:AuthService){}




    getProfiles(){
        return this.http.get<Profile[]>('http://127.0.0.1:8000/api/profiles')
    }

    getProfile(id:string){
        console.log("From Service", this.profiles)
        let profile = this.profiles.filter(p => p.id == id)
        console.log("From profile service", profile)
        return profile[0]
    }

    getProfileAsync(id:string){
        return this.http.get<{"Profile":{'name':string,'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}>('http://127.0.0.1:8000/api/profiles/'+id)
    }

    createProfile(profile:{ "name": string;
    "username": string;
    "email":  string;
    "password":  string;
    "password1":  string;}
    ){
        this.http.post('http://127.0.0.1:8000/api/create-profile',profile).subscribe(
            response => {
                console.log(profile)
                console.log("Response",response)
                this.authService.login(
                    {"username":profile.username, "password":profile.password}
                    )
            }, error =>{
                console.log("Error ",error)
                this.authService.handleError(error)
                // this.router.navigate(['login'])
            }
        )
        // this.router.navigate(['profiles'])
    }


    updateProfile(id:string,profile:{ "name": string;
    "username": string;
    "email":  string;
    "password":  string;
    "password1":  string;}){
        const updatedProfileId = id
        const updatedProfile = profile
        this.http.put('http://127.0.0.1:8000/api/update-profile/'+updatedProfileId,updatedProfile)
    .subscribe()
    this.router.navigate(['profiles'])
    }

    
    deleteProfile(id:string){
        console.log("Deleting")
        this.http.delete('http://127.0.0.1:8000/api/delete-profile/'+id).subscribe(
            ()=>{}, err => {
                // console.log(err)
                this.authService.handleError(err)

            },
        )
        this.router.navigate(['login'])
    }


    subscribeProfile(profileId:string){
        const profId = {'id':profileId}
        this.subscriptionService.getSubscribedUsers()
        this.router.navigate(['profiles'])
        return this.http.post('http://127.0.0.1:8000/api/subscribe',profId)
    }

    getMyProfile(){
        return this.http.get<{"Profile":{'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}>('http://127.0.0.1:8000/api/get-my-profile')
    }


}
