import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = 'project';
  constructor(private authService: AuthService){}

  ngOnInit() {
    console.log("Getting token from localStorage...");
    this.authService.autoLogin();
    this.authService.token = localStorage.getItem('token');
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  myInterval = setInterval(() => {
    this.isLoggedIn=this.authService.isLoggedIn
    // const token = localStorage.getItem('token');
    // if(token == undefined) {this.logout()}
  },100)
  login(){
    this.isLoggedIn = this.authService.isLoggedIn
  }
  logout(){
    this.authService.logout()
    this.isLoggedIn = this.authService.isLoggedIn
  }
}
