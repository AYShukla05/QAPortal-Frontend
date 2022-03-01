import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfilesService } from 'src/app/profiles.service';
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
  @Output() postWasDeleted = new EventEmitter<number>()

  constructor(private postService: PostService, private profilesService:ProfilesService) { }

  ngOnInit(): void {
    this.postService.getPostsasync().subscribe((posts:Post[])=> {
    this.popularPosts = posts 
    this.postService.setPosts(this.popularPosts)
  })
    this.count = this.popularPosts.length

    this.postService.postDeleted.subscribe(
      (p: Post) => {
        this.popularPosts = this.popularPosts.filter(post => post.id !== p.id)
      }
    )

}
  onSubscribedPosts(){
    this.subscribedPosts = this.popularPosts.filter(p => this.profilesService.subscribedUsers.includes(p['owner']))
    console.log(this.subscribedPosts)
    this.isSubscribed = true
  }
  onPopularPosts(){
    this.isSubscribed = false
  }
  onCreatePost(): void {
    // this.count+=1
    // let post = {owner : "Profile"+this.count, title: "Post number"+this.count, body:"This is a new post", id: this.count}
    // this.popularPosts.push(post)
  }
  
  // onPostDeleted(p:Post){
  //   this.popularPosts = this.popularPosts.filter(post => post.id !== p.id)
  //   console.log("Event from popular-list")
  //   console.log(this.popularPosts)
  // }
}


