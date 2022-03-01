import { Injectable } from "@angular/core";

@Injectable( {providedIn: 'root'})
export class ProfilesService{
    subscribedUsers: {name:string}[] = []
    profiles = [{name: 'Profile 1'},{name: 'Profile 2'},{name: 'Profile 3'}]

}