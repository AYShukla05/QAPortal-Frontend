import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Profile } from '../profile.model';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  loading = true;

  profile:any={'name': 'default','username': 'default', 'email': 'default'}; 
  id: string | undefined;

  constructor(private route: ActivatedRoute, private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id!==undefined) {
          this.profile = this.profilesService.getProfile(this.id);
          this.loading=this.profile?false:true

          if (this.profile == undefined){
            this.profilesService.getProfileAsync(this.id).subscribe(
              (profile:any)=>{
                this.profile = profile;
                this.loading = false
              })
            }
          }
        }
      );
  }

  onDelete(){
    if (this.id!==undefined){
      this.profilesService.deleteProfile(this.id)
    }

  }

  

}
