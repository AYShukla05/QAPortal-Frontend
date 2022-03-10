import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './subscriptions.service'
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  loading = true
  constructor(private subscriptionService: SubscriptionService) { }
  subscribedUsers:any[] = []
  ngOnInit(): void {
    this.subscriptionService.getSubscribedUsers().subscribe(
      (users:any[]) => {
      this.subscribedUsers = users
      this.subscriptionService.subscribedUsers = users
    }
      )
    
  }



}

