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
  // Pagination Controls
  page: any = 1;
  count: any = 5;
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
      console.log("Subscribed", this.subscriptionService.subscribedUsers)
      this.popularProfiles
      .map(profile => 
        profile['isSubscribed'] = this.subscriptionService.subscribedUsers
        .map(profile=>profile.id).includes(profile.id)?true:false)
      console.log(this.popularProfiles)
      this.loading = false;
      this.profilesService.profiles = this.allProfiles
    }, error =>{
      // console.log(error)
      this.authService.handleError(error)

    })
  }
  search(){
    this.isSearching = true
    this.popularProfiles = this.allProfiles.filter(profile => this.allProfiles.map(profile => profile.name.toLocaleLowerCase())
    .filter(name => name.includes(this.searchQuery)).includes(profile.name.toLowerCase()))
  }
  onSubscribe(user: Profile){

    
      this.profilesService.subscribeProfile(user.id).subscribe(resp =>
      user.isSubscribed = !user.isSubscribed, 
      err => {
        this.authService.handleError(err)

      }
      )

  }

}

