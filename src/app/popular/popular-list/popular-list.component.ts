import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { posts, subscribedUsers } from 'src/app/shared/dummydata';
import { Post } from '../post.model';

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
  @Output() postWasSelected = new EventEmitter<Post>()
  @Output() postWasDeleted = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
    this.popularPosts.push(...posts)
    this.count = this.popularPosts.length
  }
  onSubscribedPosts(){
    this.subscribedPosts = this.popularPosts.filter(p => subscribedUsers.map(u => u.name).includes(p.owner))
    console.log(this.subscribedPosts)
    this.isSubscribed = true
  }
  onPopularPosts(){
    this.isSubscribed = false
  }
  onCreatePost(): void {
    this.count+=1
    let post = {owner : "Profile"+this.count, title: "Post number"+this.count, body:"This is a new post", id: this.count}
    this.popularPosts.push(post)
  }
  
  onPostSelected(post:Post){
    this.postWasSelected.emit(post)
  }
  onPostDeleted(p:Post){
    this.popularPosts = this.popularPosts.filter(post => post.id !== p.id)
    console.log("Event from popular-list")
    console.log(this.popularPosts)
  }
}
