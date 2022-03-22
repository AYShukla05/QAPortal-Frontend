import { HttpClient } from '@angular/common/http';
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
  file!:File
  signingUp: boolean = false;

  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
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



  onFileSelect(event:any) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
        this.profileForm?.get('profileImage')?.setValue(this.file);
        console.log("File", this.file)
      }
  }
    
  onSubmit(){
    console.log("Inside submit")
  const value = this.profileForm.value
  const formData = new FormData();
  formData.append('name', value['name'])
  formData.append('username', value['username'])
  formData.append('password', value['password'])
  formData.append('password1', value['confirm-password'])
  formData.append('email', value['email'])
  formData.append('profileImage', this.file, this.file.name)
  console.log("Image in Formdata", formData.get('profileImage'))
  console.log("Form Data", formData);
  // this.http.post('http://127.0.0.1:8000/api/create-profile',formData)

  // console.log("Form value", value) 
  // this.profile = formData;
  console.log(this.profile)
  if (this.id==undefined){
    this.profilesService.createProfile(formData, value['username'], value['password'])
      }
      else{
        this.profilesService.updateProfile(this.id,formData)
      }
    this.profileForm.reset();
  }
  

}
