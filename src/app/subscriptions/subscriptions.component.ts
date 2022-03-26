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
  constructor(private subscriptionService: SubscriptionService, private authService: AuthService) { }
  subscribedUsers:any[] = []
  // Pagination Controls
  page: any = 1;
  count: any = 5;
  ngOnInit(): void {
    this.subscribedUsers = this.subscriptionService.subscribedUsers
    this.loading = false
      this.subscriptionService.getSubscribedUsers().subscribe(
          (users:any[]) => {
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
    console.log("User in subscribed",user)
    this.subscriptionService.subscribeProfile(user.id).subscribe(res=>{
      this.subscribedUsers = this.subscribedUsers.filter(u=>u!==user)
      console.log("Subscribed in component", this.subscribedUsers)
      this.subscriptionService.subscribedUsers = this.subscribedUsers.filter(u=>u!==user)
      console.log("Subscribed in service", this.subscriptionService.subscribedUsers)
    })

}
}

