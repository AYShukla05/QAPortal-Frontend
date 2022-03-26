import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modal/modal.service';
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
  post = { 'title': "",
          'body': '', 
          'owner': {'name': '', 'id': ''}, 
          'vote_total':0, 
          'vote_ratio':0}; 
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
    // console.log("Post", this.post)
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.profile = this.authService.loggedProfile
          // console.log("Post", this.post)

          if(this.id!==undefined) {
          this.post = this.postService.getPost(this.id)
          // console.log("Post in post Details", this.post)
          this.loading=this.post?false:true
          if (this.post == undefined){
            // console.log("Post", this.post)

            this.postService.getPostAsync(this.id).subscribe(
              (resp)=>{
                this.post = resp['Post'];
                // console.log("Post", this.post)

                this.loading = false
                this.comments = resp['Comments'];
                this.loadingComments = false
                // console.log("Comments",this.comments)
                // console.log(resp)
                this.profile = this.authService.loggedProfile
              }, (error)=>{
                this.authService.handleError(error)

                this.post = { 'title': "Dummy",'body': 'string', 'owner': {'name': 'string', 'id': 'string'}, 'vote_total':0, 'vote_ratio':0}
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
        (response:{ 'title': string,'body': string, 'owner': {'name': string, 'id': string}, 'vote_total':number, 'vote_ratio':number}) => {this.post = response},
        error=>{
          this.authService.handleError(error)

        }
        
        )
    }
  }

  onSubmit(form: NgForm) {
    console.log(form)
    this.comment = {'body':form.value['comment']};
    // console.log("New comment",form)
    // console.log("Value", form.value)
    console.log("Comment",this.comment)
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
    console.log("Editing Comment",form)
    console.log("Edited value", form.value)
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
            // console.log(err)
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
          console.log("Comments", com)
          this.comments = com.filter(comment => comment.post.id == this.id)
          this.comId = ''
        }, error =>{
          this.authService.handleError(error)

        })
    }
  }

}
