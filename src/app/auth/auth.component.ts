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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    // console.log("Login Form", form)
    // console.log("Form Value", form.value)
    // console.log("Value", form.value)
    const body = { "username": form.value.username, "password": form.value.password}
    this.authService.login(body)
    
  }
}
