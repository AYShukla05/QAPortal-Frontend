import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false;
  dropDownOpen:boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.token = localStorage.getItem('token');
    this.isLoggedIn = this.authService.isLoggedIn
  }
  myInterval = setInterval(() => {
    this.isLoggedIn = this.authService.isLoggedIn
  },100)
  login(){
    this.isLoggedIn = this.authService.isLoggedIn

  }
  logout(){
    this.authService.logout()
    this.isLoggedIn = this.authService.isLoggedIn

  }
  dropDownClick(){
    this.dropDownOpen = !this.dropDownOpen
    const timer = setTimeout(() => {
      if(this.dropDownOpen){
        this.dropDownOpen = !this.dropDownOpen
      }
    },3000)
  }

}
