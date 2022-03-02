import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-popular-details',
  templateUrl: './popular-details.component.html',
  styleUrls: ['./popular-details.component.css']
})
export class PopularDetailsComponent implements OnInit {
  post!: Post;
  id: string | undefined;
  constructor(private postService: PostService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.post = this.postService.getPost(this.id);
          console.log(this.post)
        }
      );
  }
  onDeleted(){
    if(this.id!==undefined)
    {
      console.log('sending request')
      this.postService.deletePost(this.id)
      
      // console.log("Response",response)
    }
  }

}
