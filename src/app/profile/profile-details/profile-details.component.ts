import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modal/modal.service';
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
  profile:any={'username': '', 'email': '', 'id':''}; 
  id: string | undefined;
  ownerId!: string
  constructor(private route: ActivatedRoute,
    private router: Router,
    public authService:AuthService, 
    private profilesService:ProfilesService,
    public modalService: ModalService  
    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id!==undefined) {
          this.profile = this.profilesService.getProfile(this.id);
          this.loading=this.profile?false:true
            this.ownerId = this.authService.isLoggedIn? this.authService.loggedProfile.id: ''
            this.profilesService.getProfileAsync(this.id).subscribe(
              (response) => {
                this.profile = response["Profile"]
                this.profilePosts = response["Posts"]
                this.profileComments = response['Comments']
                this.loading = false
              }, error =>{
                this.authService.handleError(error)
                this.profile = {'name':'', 'username': '', 'email':''}
              }
              )
            }
          }, error =>{
            this.authService.handleError(error)

          }
      );
      if(this.router.url == "/my-profile"){
        this.profilesService.getMyProfile().subscribe(
          (response:{"Profile":{'id':string, 'email':string| undefined, 'username':string},"Posts": any[],"Comments":any[]}) => {
            this.authService.loggedProfile = this.profile = response['Profile']
            this.ownerId = this.authService.loggedProfile.id
            this.profilePosts = response["Posts"]
            this.profileComments = response['Comments']
            this.loading = false
          }, error => {
            this.authService.handleError(error)

          }
        )
      }
  }

  onDelete(){
    if (this.ownerId!==undefined){
      this.profilesService.deleteProfile(this.ownerId)
    }

  } 

}
