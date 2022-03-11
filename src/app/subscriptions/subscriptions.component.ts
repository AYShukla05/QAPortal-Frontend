import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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
    // if(this.subscribedUsers.length==0){
      // this.loading = true
      this.subscriptionService.getSubscribedUsers().subscribe(
          (users:any[]) => {
            this.subscribedUsers = users
            this.loading = false
            this.subscriptionService.subscribedUsers = users
          }, error =>{
            // console.log(error)
            this.authService.handleError(error)

          }
            )
        // }

  }



}

