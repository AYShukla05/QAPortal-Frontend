import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading = true
  notifications:{'id':string,'messages':string}[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{'id':string,'messages':string}[]>('http://127.0.0.1:8000/api/get-notifications')
    .subscribe(
      (response) => {
        console.log(response)
        this.notifications = response;
      })
    this.loading = false;
  }

}
