import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm !: FormGroup;
  id: string | undefined
  profile!: {
    "name": string,
    "username": string,
    "email":  string|undefined,
    "profileImage"?:any
    
  };
  signingUp: boolean = false;
  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
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
          }, error =>{
            this.authService.handleError(error)
          
          }
          )
        }
      }
  }, error =>{
    this.authService.handleError(error)

  }
  )
  if (this.router.url == "/signup"){
    this.signingUp = true
    this.profile = {
      'name': "",
      "username": "",
      "email": "", 
    }
  }

  this.profileForm = new FormGroup({
    'profileImage': new FormControl(this.profile?this.profile.profileImage:null),
    'name': new FormControl(this.profile?this.profile.name:null, Validators.required),
    'username': new FormControl(this.profile?this.profile.username:null, Validators.required),
    'email': new FormControl(this.profile?this.profile.email:null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required),
    'confirm-password': new FormControl(null, Validators.required)
  })

  }
  ImageChange(event:any) {
    console.log("Image", event)
  }
  onSubmit(){
    const value = this.profileForm.value
    // console.log("Profile Edit form",form)
    // console.log("Profile Edit Value", form.value)
    // console.log("Value",value)
    const profile= {
      name: value['name'],
      username: value['username'],
      email:value['email'],
      password: value['password'],
      password1:value['confirm-password'],
      profileImage:value['profileImage']
  }
  console.log("Form value", value) 
  this.profile = profile;
  console.log(this.profile)
  if (this.id==undefined){
    console.log(profile)
    console.log(this.profile)
    // this.profilesService.createProfile(profile)
      }
      else{
        // this.profilesService.updateProfile(this.id,profile)
      }
    this.profileForm.reset();
  }
  

}
