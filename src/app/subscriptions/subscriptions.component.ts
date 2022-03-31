import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../profile/profile.model';
import { SubscriptionService } from './subscriptions.service'
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  loading = true
  profile!:Profile;
  constructor(private subscriptionService: SubscriptionService, private authService: AuthService) { }
  subscribedUsers:any[] = []
  // Pagination Controls
  page: any = 1;
  count: any = 5;
  ngOnInit(): void {
    this.profile = this.authService.loggedProfile
    this.subscribedUsers = this.subscriptionService.subscribedUsers
    this.loading = false
      this.subscriptionService.getSubscribedUsers().subscribe(
          (users:Profile[]) => {
            this.subscribedUsers = users
            this.loading = false
            this.subscriptionService.subscribedUsers = users
            this.subscribedUsers.map(profile=>profile.isSubscribed=true)
          }, error =>{
            this.authService.handleError(error)

          }
            )
  }

  onUnsubscribe(user: Profile){
    this.subscriptionService.subscribeProfile(user.id).subscribe(res=>{
      this.subscribedUsers = this.subscribedUsers.filter(u=>u!==user)
      this.subscriptionService.subscribedUsers = this.subscribedUsers.filter(u=>u!==user)
    })

}
}

