import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading = true
  notifications:{'id':string,'messages':string, 'owner':any,'post':{'id':string}}[] = []
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.http.get<{'id':string,'messages':string, 'owner':any, 'post':{'id':string}}[]>('http://127.0.0.1:8000/api/get-notifications')
    .subscribe(
      (response) => {
        console.log(response)
        this.notifications = response;
      }, error =>{
        // console.log(error)
        this.authService.handleError(error)
      }
      )
    this.loading = false;
  }

}
