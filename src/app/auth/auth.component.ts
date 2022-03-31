import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = false;
  authForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){

    const body = { "username": this.authForm.value.username, "password": this.authForm.value.password}
    this.authService.login(body)
    
  }
}
