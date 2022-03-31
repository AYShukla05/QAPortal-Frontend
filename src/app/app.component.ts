import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ModalService } from './modal/modal.service';
import { PostService } from './posts/posts.service';
import { ProfilesService } from './profile/profiles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  isLoggedIn: boolean = false;
  title = 'project';
  constructor(public authService: AuthService, 
    public modalService: ModalService, private profilesService:ProfilesService, private postService: PostService){}

  ngOnInit() {
    this.profilesService.getProfiles().subscribe(
      resp=>{this.profilesService.profiles = resp}
    )
    this.postService.getPostsasync().subscribe(
      resp=>{this.postService.posts = resp.map(
        response=>{
          let tempPost:any = response['Post'];
          tempPost.vote=response['Vote'];
          return tempPost})}
    )
    
  }
  closePop(){
    this.authService.isError = false
  }
}
