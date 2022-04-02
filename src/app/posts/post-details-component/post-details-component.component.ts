import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modal/modal.service';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-details-component',
  templateUrl: './post-details-component.component.html',
  styleUrls: ['./post-details-component.component.css']
})
export class PostDetailsComponent implements OnInit {
  loading = true;
  loadingComments = true
  comment:{ 'body': string} = { 'body': ''};
  editCommentMode: boolean = false;
  comments:any[] = []
  post : Post = { 'title': "",
  'id':'',
  'body': '', 
  'owner': {'name': '', 'id': '', 'email':'', 'username':'', 'isSubscribed':false, 'profileImage':'', 'isVerified':true}, 
  'vote_total':0, 
  'vote_ratio':0,
  'vote': 'up'
}; 
  id: string | undefined;
  comId: string = '';
  bodyText: string | undefined;
  // Pagination Controls
  page: any = 1;
  count: any = 5;
  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    public authService:AuthService,  
    public modalService: ModalService  
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
                this.post = {...resp['Post'], vote: resp['Vote']};
                this.loading = false
                this.comments = resp['Comments'];
                this.loadingComments = false
                this.profile = this.authService.loggedProfile
              }, (error)=>{
                this.authService.handleError(error)

                this.post = { 'title': "Dummy",'body': 'string', 'owner': {'name': '', 'isVerified':true,'id': '', 'email':'', 'username':'', 'isSubscribed':false, 'profileImage':''}, 'vote_total':0, 'vote_ratio':0, 'id':'', 'vote':'up'}
              })
            }
          }
        }
      );

    
    if(this.id!==undefined && this.authService.isLoggedIn) {
      this.postService.getComments(this.id).subscribe(
        (comments:any) => {
          this.loadingComments = false
          this.comments = comments
          this.comments.map(comment => comment['editCommentMode']=false)
        }, error => {
          this.authService.handleError(error)

        }
        )
    }

  }

  vote(event:string){
    const vote = {'value': event}
    if (this.id!=undefined){
      this.postService.vote(this.id, vote)
      .subscribe(
        (response:{"Post":Post, "Vote": string}) => 
        {
          this.post = {...response["Post"],vote: response["Vote"]}
        },
        error=>{
          this.authService.handleError(error)

        }
        
        )
    }
  }

  onSubmit(form: NgForm) {
    this.comment = {'body':form.value['comment']};
    if (this.id!==undefined){
      this.postService.addComment(this.id, this.comment).subscribe(
        comment => 
        {
        this.comments.push(comment)
      }, error =>{
        this.authService.handleError(error)

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

    this.comments.
    map(innerComment => 
      {if(innerComment.id!=id)
        {return innerComment}
      else{innerComment.editCommentMode = true}}
      )
    
  }

  onSubmitComment(form: NgForm, comId: string){
    this.comment['body'] = form.value.comment;
    if (this.id!==undefined ){
      this.postService.editComment(comId, this.comment,this.id).subscribe(
        (resp:{'body':string}) =>{
          this.comments.
    map(innerComment => 
      {if(innerComment.id!=comId)
        {return innerComment}
      else{
        innerComment.editCommentMode = false
        innerComment.body = resp['body']
      }}
      )
        }, err => {
            this.authService.handleError(err)

        },
    )
    }
    this.comments.map(comment => comment['editCommentMode']=false)

  }

  DeleteInit(comId:string){
    this.comId = comId
  }

  onDeleteComment(){
    if (this.id!==undefined ){
      this.postService.deleteComment(this.comId,this.id).subscribe(
        com => 
        {
          this.comments = com.filter(comment => comment.post.id == this.id)
          this.comId = ''
        }, error =>{
          this.authService.handleError(error)

        })
    }
  }

}
