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
  imgPath: string | undefined = undefined
  changingPassword: boolean = false

  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.profile=this.authService.isLoggedIn?this.authService.loggedProfile:undefined;
    // Profile Form
    this.profileForm = new FormGroup({
      'profileImage': new FormControl(this.profile?this.profile.profileImage:null),
      'name': new FormControl(this.profile?this.profile.name:null, Validators.required),
      'username': new FormControl(this.profile?this.profile.username:null, Validators.required),
      'email': new FormControl(this.profile?this.profile.email:null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'newpassword' : new FormControl(null, this.changingPassword?Validators.required:null),
      'confirm-password': new FormControl(null, this.signingUp||this.changingPassword?Validators.required:null)
    })
    // Setting this profile on refresh
    this.route.params.subscribe(params => {
      this.id = params['id']
      if(this.id!==undefined){
        this.profile = this.profilesService.getProfile(this.id)
        console.log(this.profile)
        if (this.profile==undefined){
          this.profilesService.getProfileAsync(this.id).subscribe(
            (response:{"Profile":{'id':string, 'email':string| undefined, 'username':string, 'name':string},"Posts": any[],"Comments":any[]}) => {
            this.profile = response["Profile"]
            console.log(this.profile)

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
  console.log("URL", this.router.url, this.router.url.includes('edit'))
  console.log(this.router.url.includes('edit')&&this.id==undefined)
  // if(this.router.url.includes('edit')&&this.id==undefined){
  //   this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/edit'))])
  // }
  if (this.router.url == "/signup"){
    this.signingUp = true
    this.profile = {
      'name': "",
      "username": "",
      "email": "", 
    }
  }
  
  

  }



  onFileSelect(event:any) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
        this.profileForm?.get('profileImage')?.setValue(this.file);
        console.log("File", this.file)
        this.imgPath= event.target.result;
        console.log("ImagePath", this.imgPath)
          let reader = new FileReader();
          reader.onload = (event: any) => {
              this.imgPath = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
      }
  }
    
  onChangePassword(){
    this.changingPassword=true
  }
  onSubmit(){
    console.log("Inside submit")
    const value = this.profileForm.value
    const formData = new FormData();
    formData.append('name', value['name'])
    formData.append('username', value['username'])
    formData.append('password', value['password'])
    formData.append('email', value['email'])
    if(this.signingUp){
      formData.append('confirm-password', value['confirm-password'])

    }
    if(this.file)
    formData.append('profileImage', this.file, this.file.name)
    else
    formData.append('profileImage', "")
    if(this.changingPassword){
      const passwordFormData = new FormData()
      passwordFormData.append('newPassword', value['newpassword'])
      passwordFormData.append('confirm-password', value['confirm-password'])
      this.profilesService.changePassword(value['password'],passwordFormData)
    }
    // console.log(this.profile)
    console.log("Form Data", formData)
    if (this.id==undefined){
      this.profilesService.createProfile(formData, value['username'], value['password'])
    }
    else{
      this.profilesService.updateProfile(this.id,formData)
    }
    this.changingPassword=false
    this.profileForm.reset();
  }
  
  
}
