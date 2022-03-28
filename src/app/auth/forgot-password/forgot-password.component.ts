import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword !: FormGroup;
  message!: string

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.forgotPassword = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onSubmit(): void {
    this.authService.forgotPassword(this.forgotPassword.value).subscribe(
      (response) => {
        this.message = response['message']
      }, (error)=>{
        this.authService.handleError(error)
      }
    )
    this.forgotPassword.reset()
  }

}
