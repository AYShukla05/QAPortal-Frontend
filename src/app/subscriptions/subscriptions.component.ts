import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profile/profiles.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subscribedUsers:{ name:string; }[] = []
  // subscribedUser: { name: string; } | undefined;
  constructor(private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.subscribedUsers.push(...this.profilesService.subscribedUsers)
  }

  

}
// function subscribedUsers(subscribedUsers: any, user: { name: string; }) {
//   throw new Error('Function not implemented.');
// }

