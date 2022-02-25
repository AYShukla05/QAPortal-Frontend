import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  title = 'project';
  changeLogIn(){
    this.isLoggedIn = !this.isLoggedIn;
  }
}
