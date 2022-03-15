import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ModalService } from './_modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;

  isLoggedIn: boolean = false;
  title = 'project';
  constructor(public authService: AuthService, public modalService: ModalService){}

  ngOnInit() {
    console.log("Getting token from localStorage...");
    this.authService.autoLogin();
    this.authService.token = localStorage.getItem('token');
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  myInterval = setInterval(() => {
    this.isLoggedIn=this.authService.isLoggedIn
  },100)
  login(){
    this.isLoggedIn = this.authService.isLoggedIn
  }
  logout(){
    this.authService.logout()
    this.isLoggedIn = this.authService.isLoggedIn
  }
  closePop(){
    this.authService.isError = false
  }
}
