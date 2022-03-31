import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false;
  dropDownOpen:boolean = false;
  unreadNotification !: number
  @Output() searching = new EventEmitter();
  searchQuery: string = '';
  constructor(private router: Router,
    private http: HttpClient, 
    public authService: AuthService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.token = localStorage.getItem('token');
    
    this.authService.readNotification.subscribe(unreadNotification => {
      this.unreadNotification = unreadNotification
    })
    this.authService.loginChanged.subscribe(res=>
      this.isLoggedIn = this.authService.isLoggedIn
    )

  }
  
  logout(){
    this.authService.logout()
  }

  search(){
    if(this.searchQuery.trim()==''){
      if(this.router.url=="/search"){
        this.headerService.setSearchQuery(this.searchQuery)
      }
      return 
    }
    this.headerService.setSearchQuery(this.searchQuery)
    this.router.navigate(['search'])
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
