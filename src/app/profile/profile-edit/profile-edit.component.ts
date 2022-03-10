import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  id: string | undefined
  profile!: {
    "name": string,
    "username": string,
    "email":  string|undefined,
    
  };
  signingUp: boolean = false;
  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute, 
    private router: Router,
    // private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if(this.id!==undefined){
        this.profile = this.profilesService.getProfile(this.id)
        if (this.profile==undefined){
          this.profilesService.getProfileAsync(this.id).subscribe(
            (response:{"Profile":{'id':string, 'email':string| undefined, 'username':string, 'name':string},"Posts": any[],"Comments":any[]}) => {
            this.profile = response["Profile"]
          }
          )
        }
      }
  })
  if (this.router.url == "/signup"){
    this.signingUp = true
    this.profile = {
      'name': "",
      "username": "",
      "email": "", 
    }
  }
  }
  
  onSubmit(form: NgForm){
    const value = form.value
    console.log("Profile Edit form",form)
    console.log("Profile Edit Value", form.value)
    console.log("Value",value)
    const profile= {
      name: value['name'],
      username: value['username'],
      email:value['email'],
      password: value['password'],
      password1:value['confirm-password']
  } 
  this.profile = profile;
  if (this.id==undefined){
    console.log(profile)
    console.log(this.profile)
    this.profilesService.createProfile(profile)
      }
      else{
        this.profilesService.updateProfile(this.id,profile)
      }
    form.reset();
  }
  

}
