import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword !: FormGroup;
  constructor(private route: ActivatedRoute,private authService: AuthService) { }
  id: string = ''
  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    })

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];})
  }
  onSubmit(){
    this.authService.resetPassword(this.resetPassword.value, this.id)
  }

}
