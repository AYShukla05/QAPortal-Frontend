import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { backEndURL } from '../config';
import { Profile } from '../profile/profile.model';
import { ProfilesService } from '../profile/profiles.service';

@Component({
  selector: 'app-verification-pending',
  templateUrl: './verification-pending.component.html',
  styleUrls: ['./verification-pending.component.css']
})
export class VerificationPendingComponent implements OnInit {
id: string = ''
token: string = ''
  
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private http: HttpClient, 
    private profilesService:ProfilesService,
    private authService: AuthService) { }
    username: string = ''
    password: string = ''

  ngOnInit(): void {
    console.log(this.router.url)
    this.route.queryParams.subscribe(params => {
      this.username = params['username']
      this.password = params['password']
    })
    if(this.router.url.includes('/verifying/')){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.token = params['token'];
          
          console.log(this.id, this.token)

            this.http.get<Profile>(backEndURL+'verify/'+this.id+'/'+this.token).subscribe(
              response => {
                console.log(response)
                this.authService.loggedProfile = response
                console.log(this.authService.loggedProfile)
                this.authService.verify(response)
                this.router.navigate(['posts'])
                
              }
            )
          }
          
          )
        }

  }

}
