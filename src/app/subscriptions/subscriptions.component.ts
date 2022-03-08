import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscriptionService } from './subscriptions.service'
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  loading = true
  constructor(private http: HttpClient) { }
  subscribedUsers:any[] = []
  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/get-subscribed').subscribe(
      users => {
      this.subscribedUsers = users
      this.loading = false
    }
      )
  }

  onUnsubscribe(){

  }

}

