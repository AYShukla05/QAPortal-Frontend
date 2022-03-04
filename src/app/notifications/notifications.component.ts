import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading = true
  notifications = []
  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

}
