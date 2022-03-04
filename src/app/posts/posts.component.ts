import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profile/profiles.service';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  loading = true;
  isSubscribed: boolean = false;

  allPosts:Post[] = []
  subscribedPosts:Post[] = []
  constructor(private postService: PostService, private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.postService.getPostsasync().subscribe(
      (posts:Post[]) => {
        this.allPosts.push(...posts)
        this.loading=false
      this.postService.posts = this.allPosts
    }
      )
  }

  onSubscribedPosts(){
    this.isSubscribed = true
    this.subscribedPosts = this.allPosts
    .filter
    ((post:Post) => 
      this.profilesService.subscribedUsers
      .map((post: { id: any; }) => post.id).includes(post.owner.id)
      )
      }

  
  onPopularPosts(){
    this.isSubscribed = false
  }

}
