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
  profile = this.authService.isLoggedIn?this.authService.loggedProfile:{'id':'', 'email':'', 'name':'', 'username':''}
  id: string| undefined
  searchQuery: string = '';
  // Pagination Controls
  page: any = 1;
  count: any = 6;
  popularProfiles:any[] = []
  isSearching:boolean = false;
  loading = true
  allProfiles:Profile[] = []
  constructor(private profilesService:ProfilesService,
    private subscriptionService:SubscriptionService, 
    public authService:AuthService) { }

  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe((profiles:Profile[])=>{
      console.log("Inside Profile")
      this.allProfiles = profiles;
      this.popularProfiles = this.allProfiles
      this.loading = false;
      // Getting Profile
      if(this.authService.isLoggedIn){
        this.popularProfiles
        .map(profile => 
          profile['isSubscribed'] = this.subscriptionService.subscribedUsers
          .map(profile=>profile.id).includes(profile.id)?true:false)
        this.loading = false;
        this.profilesService.profiles = this.allProfiles
      , (error:any) =>{
        this.authService.handleError(error)
  
      }
      }},(error:any) =>{
        this.authService.handleError(error)
      }
     )
  }

  search(){
    this.isSearching = true
    this.popularProfiles = this.allProfiles.filter(profile => this.allProfiles.map(profile => profile.name.toLocaleLowerCase())
    .filter(name => name.includes(this.searchQuery.toLowerCase())).includes(profile.name.toLowerCase()))
  }

  onSubscribe(user: Profile){
      this.profilesService.subscribeProfile(user.id).subscribe(resp =>
      {user.isSubscribed = !user.isSubscribed
      if(user.isSubscribed){
        console.log("True",user)
        this.subscriptionService.subscribedUsers.push(user)
        console.log("onSubscribing", this.subscriptionService.subscribedUsers)
      }
      else{
        this.subscriptionService.subscribedUsers = this.subscriptionService.subscribedUsers.filter(u=>u.id!==user.id)
      }
    },
      err => {
        this.authService.handleError(err)
      }
      )
  }

}

