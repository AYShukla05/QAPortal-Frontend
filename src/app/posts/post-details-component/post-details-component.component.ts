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
  loading = true
  comment:{ 'body': string} = { 'body': 'string'};
  editCommentMode: boolean = false;
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
          this.loading = false
          this.comments.push(...comments)
        }
        )
    }

    

  }

  onSubmit(form: NgForm) {
    this.comment = {'body':form.value.comment};
    if (this.id!==undefined){
      this.postService.addComment(this.id, this.comment)
    }
    form.reset()

  }

  onDelete(){
    if (this.id!==undefined){
      this.postService.deletePost(this.id)
    }

  }

  onEditComment(){
    this.editCommentMode = true
  }

  onSubmitComment(form: NgForm, comId: string){
    this.comment['body'] = form.value.comment;
    if (this.id!==undefined ){
      this.postService.editComment(comId, this.comment,this.id)
    }
    this.editCommentMode = false

  }


  onDeleteComment(comId: string){
    if (this.id!==undefined ){
      this.postService.deleteComment(comId,this.id)
    }
  }

}
