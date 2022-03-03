import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/profile/profiles.service';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.component.html',
  styleUrls: ['./popular-list.component.css']
})
export class PopularListComponent implements OnInit {
  isSubscribed: boolean = false;
  popularPosts:Post[] = [];
  subscribedPosts:Post[] = [];
  count:number = 0;

  constructor(private postService: PostService, private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.postService.getPostsasync().subscribe((posts:Post[])=> {
    this.popularPosts = posts 
    this.postService.setPosts(this.popularPosts)
  })
    this.count = this.popularPosts.length

    

    

}
  onSubscribedPosts(){
    this.subscribedPosts = this.popularPosts
      .filter
      (post => 
        this.profilesService.subscribedUsers
        .map(user => user.id).includes(post.owner.id))
    this.isSubscribed = true
  }
  onPopularPosts(){
    this.isSubscribed = false
  }

 
  
  
}


