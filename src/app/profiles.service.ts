import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Profile } from "./profile/profile.model";

@Injectable( {providedIn: 'root'})
export class ProfilesService{
    constructor(private http: HttpClient){}

    subscribedUsers: Profile[] = []

    getProfiles(){
        return this.http.get<any[]>('http://127.0.0.1:8000/api/profiles')
    }
}