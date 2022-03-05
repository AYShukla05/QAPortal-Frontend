import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profile/profiles.service';
import { subscriptionService } from './subscriptions.service'
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  loading = true
  subscribedUsers:{ name:string; }[] = []
  // subscribedUser: { name: string; } | undefined;
  constructor(private subscriptionService: subscriptionService) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscribedUsers().subscribe(
      sub=>
      this.subscribedUsers.push(...sub)
    )
    // this.subscribedUsers.push(...this.profilesService.subscribedUsers)
    this.loading = false
  }

  

}
// function subscribedUsers(subscribedUsers: any, user: { name: string; }) {
//   throw new Error('Function not implemented.');
// }

