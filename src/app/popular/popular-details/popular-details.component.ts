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
  post!: {[key: string]:any};
  id: number | undefined;
  constructor(private postService: PostService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // console.log(this.post)
          this.id = params['id'];
          this.post = this.postService.getPost(this.id);

        }
      );
  }

}
