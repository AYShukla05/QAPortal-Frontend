import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';



@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  selectedPost: Post | undefined;
  
  
  constructor() {
   }

  ngOnInit(): void {
    
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  
}
