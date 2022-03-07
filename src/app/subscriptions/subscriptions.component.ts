import { Component, OnInit } from '@angular/core';
import { subscriptionService } from './subscriptions.service'
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  loading = true
  constructor(private subscriptionService: subscriptionService) { }
  subscribedUsers:any[] = []
  ngOnInit(): void {
    this.subscriptionService.getSubscribedUsers()
    this.subscribedUsers.push(...this.subscriptionService.subscribedUsers)
    this.loading = false
  }

  

}

