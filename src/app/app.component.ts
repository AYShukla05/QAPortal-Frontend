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
  }
 
  closePop(){
    this.authService.isError = false
  }
}
