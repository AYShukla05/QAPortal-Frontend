import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from 'src/app/profile/profiles.service';
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
  post:any = { 'title': "Dummy",'body': 'string', 'owner': {'name': 'string', 'id': 'string'}, 'vote_total':0, 'vote_ratio':0}; 
  id: string | undefined;
  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    private authService:AuthService,    
   ) { }
  profile: any
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.profile = this.authService.loggedProfile
          if(this.id!==undefined) {
          this.post = this.postService.getPost(this.id)
          this.loading=this.post?false:true
          if (this.post == undefined){
            this.postService.getPostAsync(this.id).subscribe(
              (resp)=>{
                this.post = resp['Post'];
                this.comments = resp['Comments'];
                this.profile = this.authService.loggedProfile
                this.loading = false
              }, (error)=>{
                console.log(error)
                this.post = { 'title': "Dummy",'body': 'string', 'owner': {'name': 'string', 'id': 'string'}, 'vote_total':0, 'vote_ratio':0}
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
          this.comments.map(comment => comment['editCommentMode']=false)
        }
        )
    }

    

  }

  vote(event:string){
    const vote = {'value': event}
    if (this.id!=undefined){
      this.postService.vote(this.id, vote).subscribe((response) => this.post = response)
    }
  }

  onSubmit(form: NgForm) {
    this.comment = {'body':form.value.comment};
    console.log("New comment",form)
    console.log("Value", form.value)
    if (this.id!==undefined){
      this.postService.addComment(this.id, this.comment).subscribe(
        post => 
        {
        this.comments.push(post)
      }
    )
    }
    form.reset()

  }

  onDelete(){
    if (this.id!==undefined){
      this.postService.deletePost(this.id)
    }

  }

  onEditComment(id:string){
    const selectedComment = this.comments.filter(comment => comment['id']==id)[0]
    selectedComment.editCommentMode = true
    this.comments = this.comments.filter(comment => comment['id']!=id)
    this.comments.push(selectedComment)
  }

  onSubmitComment(form: NgForm, comId: string){
    console.log("Editing Comment",form)
    console.log("Edited value", form.value)
    this.comment['body'] = form.value.comment;
    if (this.id!==undefined ){
      this.postService.editComment(comId, this.comment,this.id)
    }
    this.comments.map(comment => comment['editCommentMode']=false)

  }


  onDeleteComment(comId: string){
    if (this.id!==undefined ){
      this.postService.deleteComment(comId,this.id).subscribe(
        com => 
        {
          this.comments = com;
        }
    )
    }
  }

}
