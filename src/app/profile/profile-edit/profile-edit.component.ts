import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  id: string | undefined
  profile = {
    "name": "a",
    "username": "as",
    "email":  "as",
    "password":  "as",
    "password1":  "as",
  };
  constructor(private profilesService: ProfilesService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] 
  })
  }
  
  onSubmit(form: NgForm){
    const value = form.value
    console.log(form)
    const profile= {
      name: value['name'],
      username: value['username'],
      email:value['email'],
      password: value['password'],
      password1:value['confirm-password']
  } 
  this.profile = profile;
  if (this.id==undefined){
    this.profilesService.createProfile(profile)
      }
      else{
        this.profilesService.updateProfile(this.id,profile)
      }
    form.reset();
  }
  

}
