import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  thissubscribedUsers:{ name:string; }[] = []
  profile = {
    name: 'Profile 1'
  }
  constructor(private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.thissubscribedUsers.push(...this.profilesService.profiles)
  }
  onSubscribe(user: { name:string;}){
    console.log(this.profilesService.subscribedUsers, user)

    if (this.profilesService.subscribedUsers.includes(user)){
      console.log(user)
      this.profilesService.subscribedUsers = this.profilesService.subscribedUsers.filter(u => u.name !== user.name)
      console.log(this.profilesService.subscribedUsers.filter(u => u.name !== user.name))
      // console.log(subscribedUsers)
    }
    else{
    console.log(user)
    this.profilesService.subscribedUsers.push(user)
    console.log(this.profilesService.subscribedUsers)
  }
  }

}

