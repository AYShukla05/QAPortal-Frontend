import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-details-component',
  templateUrl: './post-details-component.component.html',
  styleUrls: ['./post-details-component.component.css']
})
export class PostDetailsComponent implements OnInit {
  loading = true;
  loadingComments = true
  comment:{ 'body': string} = { 'body': 'string'};
  editCommentMode: boolean = false;
  comments:any[] = []
  post = { 'title': "Dummy",'body': 'string', 'owner': {'name': 'Default'}}; 
  id: string | undefined;
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(this.id!==undefined) {
          this.post = this.postService.getPost(this.id)
          this.loading=this.post?false:true
          if (this.post == undefined){
            this.postService.getPostAsync(this.id).subscribe(
              (post:any)=>{
                this.post = post;
                this.loading = false
              })
            }
          }
        }
      );

    
    if(this.id!==undefined) {
      this.postService.getComments(this.id).subscribe(
        (comments:any) => {
          this.loadingComments = false
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
