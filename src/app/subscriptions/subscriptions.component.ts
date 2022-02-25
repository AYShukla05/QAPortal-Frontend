import { Component, OnInit } from '@angular/core';
import { profiles, subscribedUsers } from '../shared/dummydata';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  thissubscribedUsers:{ name:string; }[] = []
  subscribedUser: { name: string; } | undefined;
  constructor() { }

  ngOnInit(): void {
    this.thissubscribedUsers.push(...profiles)
  }

  onSubscribe(user: { name:string;}){
    console.log(subscribedUsers, user)

    if (subscribedUsers.includes(user)){
      console.log(user)
      console.log(subscribedUsers.filter(u => u.name !== user.name))
      // console.log(subscribedUsers)
    }
    else{
    console.log(user)
    subscribedUsers.push(user)
    console.log(subscribedUsers)
  }
  }

}
