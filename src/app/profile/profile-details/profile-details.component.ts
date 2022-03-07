import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Profile } from '../profile.model';
import { ProfilesService } from '../profiles.service';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  loading = true;
  profilePosts:any[] = []
  profileComments:any[] = []
  profile:any={'username': 'default', 'email': 'default', 'id':'string'}; 
  id: string | undefined;

  constructor(private route: ActivatedRoute,private router: Router, private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id!==undefined) {
          this.profile = this.profilesService.getProfile(this.id);
          this.loading=this.profile?false:true

            this.profilesService.getProfileAsync(this.id).subscribe(
              (profile:any)=>{
                this.profile = profile;
                this.loading = false
              })
            }
          }
      );
      console.log(this.router.url)
      if(this.router.url == "/my-profile"){
        this.profilesService.getMyProfile().subscribe(
          (response:{"Profile":{'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}) => {
            console.log(response)
            this.profilesService.profile = this.profile = response['Profile']
            this.profilePosts = response["Posts"]
            this.profileComments = response['Comments']
            this.loading = false
          }
        )
      }
  }

  onDelete(){
    if (this.id!==undefined){
      this.profilesService.deleteProfile(this.id)
    }

  }

  

}
