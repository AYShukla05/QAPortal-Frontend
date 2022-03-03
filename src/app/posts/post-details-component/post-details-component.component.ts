import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-details-component',
  templateUrl: './post-details-component.component.html',
  styleUrls: ['./post-details-component.component.css']
})
export class PostDetailsComponent implements OnInit {
  comments:any[] = []
  post!: Post; 
  id: string | undefined;
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id!==undefined) {
          this.post = this.postService.getPost(this.id);
          }
        }
      );
    if(this.id!==undefined) {
      this.postService.getComments(this.id).subscribe(
        (comments:any) => {
          this.comments.push(...comments)
        }
        )
    }
  }

  onSubmit(form: NgForm) {
    const comment = {'body':form.value.comment};
    if (this.id!==undefined){
      this.postService.addComment(this.id, comment)
    }
    form.reset()

  }

  onDelete(){
    if (this.id!==undefined){
      this.postService.deletePost(this.id)
    }

  }

}
