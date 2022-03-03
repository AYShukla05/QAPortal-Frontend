import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  isSubscribed: boolean = false;

  allPosts:Post[] = []
  subscribedPosts:Post[] = []
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostsasync().subscribe(
      (posts:Post[]) => {this.allPosts.push(...posts)
      this.postService.posts = this.allPosts}
      )


  }

  onSubscribedPosts(){
    this.subscribedPosts = this.allPosts
      .filter
      (post => 
        this.postService.subscribedUsers
        .map((post: { id: any; }) => post.id).includes(post.owner.id))
    this.isSubscribed = true
  }
  onPopularPosts(){
    this.isSubscribed = false
  }

}
