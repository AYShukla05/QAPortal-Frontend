import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './posts.service';



@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
  providers: [PostService]
})
export class PopularComponent implements OnInit {
  selectedPost: Post | undefined;
  
  
  constructor(private postService: PostService) {
   }

  ngOnInit(): void {
    this.postService.postSelected.subscribe( 
      (post: Post) => {
      this.selectedPost = post;
      }
    )
    
  }



  
}
