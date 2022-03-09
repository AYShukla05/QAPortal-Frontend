import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
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
  ownerId!: string
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService, 
    private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id!==undefined) {
          this.profile = this.profilesService.getProfile(this.id);
          this.loading=this.profile?false:true
            this.ownerId = this.authService.loggedProfile.id
            this.profilesService.getProfileAsync(this.id).subscribe(
              (response:{"Profile":{'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}) => {
                console.log(response)
                // console.log(this.profilesService.profile)
                this.profilePosts = response["Posts"]
                this.profileComments = response['Comments']
                this.loading = false
              }
              )
            }
          }
      );
      console.log(this.router.url)
      if(this.router.url == "/my-profile"){
        this.profilesService.getMyProfile().subscribe(
          (response:{"Profile":{'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}) => {
            console.log(response)
            this.authService.loggedProfile = this.profile = response['Profile']
            console.log(this.profilesService.profile)
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
