import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  allProfiles:Profile[] = []
  profile = {
    name: 'Profile 1'
  }
  constructor(private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe((profiles:Profile[])=>{
      this.allProfiles.push(...profiles);
      // console.log(this.allProfiles)
    })
  }
  onSubscribe(user: Profile){


    if (this.profilesService.subscribedUsers.includes(user)){
      this.profilesService.subscribedUsers = this.profilesService.subscribedUsers.filter(u => u.name !== user.name)
    }
    else{
    this.profilesService.subscribedUsers.push(user)
  }
  }

}

