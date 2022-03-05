import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = false;
  token: string| undefined

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.authService.token
  }

  onSubmit(form: NgForm){
    const body = { "username": form.value.username, "password": form.value.password}
    this.authService.login(body)
    
  }
}
