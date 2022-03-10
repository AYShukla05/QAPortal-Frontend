import { Component, OnInit } from '@angular/core';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.model';
import { AuthService } from '../auth/auth.service';
import { SubscriptionService } from '../subscriptions/subscriptions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = this.authService.loggedProfile
  id: string| undefined
  searchQuery: string = '';

  // ownerId !: string
  popularProfiles:any[] = []
  isSearching:boolean = false;
  loading = true
  allProfiles:Profile[] = []
  constructor(private profilesService:ProfilesService,private subscriptionService:SubscriptionService, private authService:AuthService) { }

  ngOnInit(): void {
    // this.ownerId = this.authService.profile.id
    this.profilesService.getProfiles().subscribe((profiles:Profile[])=>{
      this.allProfiles.push(...profiles);
      this.popularProfiles = this.allProfiles
      this.popularProfiles.map(profile => profile['isSubscribed'] = this.subscriptionService.subscribedUsers.includes(profile)?true:false)
      console.log(this.popularProfiles)
      this.loading = false;
      this.profilesService.profiles = this.allProfiles
    })
  }
  search(){
    this.isSearching = true
    this.popularProfiles = this.allProfiles.filter(profile => this.allProfiles.map(profile => profile.name.toLocaleLowerCase())
    .filter(name => name.includes(this.searchQuery)).includes(profile.name.toLowerCase()))
  }
  onSubscribe(user: Profile){

    console.log("Clicked")
    if (this.subscriptionService.subscribedUsers.includes(user)){
      this.subscriptionService.subscribedUsers = 
      this.subscriptionService.subscribedUsers.filter(u => u.name !== user.name)
      this.profilesService.subscribeProfile(user.id)
    }
    else{
    this.subscriptionService.subscribedUsers.push(user)
    }
  }

}

