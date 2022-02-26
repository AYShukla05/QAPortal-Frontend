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
  id: number | undefined;
  constructor(private postService: PostService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.post = this.postService.getPost(this.id-1);
        }
      );
  }

}
