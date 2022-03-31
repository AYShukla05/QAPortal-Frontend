import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../profile/profile.model';
import { ProfilesService } from '../profile/profiles.service';
import { SubscriptionService } from '../subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  loading = true
  profile!:Profile;
  subscribers:Profile[] = [];
  // Pagination Controls
  page: any = 1;
  count: any = 6;
  constructor(private profilesService:ProfilesService,private subscriptionService:SubscriptionService,  private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Profile[]>('http://127.0.0.1:8000/api/get-followers').subscribe((response) => {
      this.subscribers = response
      this.subscribers
      .map(profile => 
        profile['isSubscribed'] = this.subscriptionService.subscribedUsers
        .map(profile=>profile.id).includes(profile.id)||profile.id==this.profile.id?true:false)
    })
    this.loading = false;
  }

  onSubscribe(user: Profile){
    this.profilesService.subscribeProfile(user.id).subscribe(resp =>
    {user.isSubscribed = !user.isSubscribed
    if(user.isSubscribed){
      this.subscriptionService.subscribedUsers.push(user)
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
