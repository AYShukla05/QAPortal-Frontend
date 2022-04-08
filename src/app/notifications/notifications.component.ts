import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { backEndURL } from '../config';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading = true
  notifications:{'id':string,'messages':string, 'owner':any,'post':{'id':string}, 'isRead':boolean}[] = []
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.http.get<{'id':string,'messages':string, 'owner':any, 'post':{'id':string},'isRead':boolean}[]>(backEndURL+'get-notifications')
    .subscribe(
      (response) => {
        this.notifications = response;
      }, error =>{
        this.authService.handleError(error)
      }
      )
      this.loading = false;
      
  }

  read(id:string){
    this.http.get<{'unreadNotification':number}>(
      backEndURL+'read-notifications/'+id).subscribe(
      response => {
        
        this.authService.readNotification.next(response.unreadNotification)
      }
    )
  }

  readAll(){
    this.http.get(backEndURL+'read-all-notifications').subscribe(
      res=>{
      this.notifications = this.notifications.map(
      not=>
      {
        let notification = {...not}
        notification.isRead = true
        return notification
      }
      )
      this.authService.readNotification.next(0)
    
    
  })

}
}