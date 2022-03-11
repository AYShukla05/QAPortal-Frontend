import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from 'src/app/profile/profiles.service';
import { ModalService } from 'src/app/_modal/modal.service';
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
  comId: string = '';
  bodyText: string | undefined;
  // Pagination Controls
  page: any = 1;
  count: any = 5;
  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    private authService:AuthService,  
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
                this.post = resp['Post'];
                this.comments = resp['Comments'];
                console.log("Comments",this.comments)
                console.log(resp)
                this.profile = this.authService.loggedProfile
                this.loading = false
              }, (error)=>{
                // console.log(error)
                this.authService.handleError(error)

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
          this.comments = comments
          this.comments.map(comment => comment['editCommentMode']=false)
        }, error => {
          // console.log(error)
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
        (response) => {this.post = response},
        error=>{
          // console.log(error)
          this.authService.handleError(error)

        }
        
        )
    }
  }

  onSubmit(form: NgForm) {
    this.comment = {'body':form.value.comment};
    console.log("New comment",form)
    console.log("Value", form.value)
    if (this.id!==undefined){
      this.postService.addComment(this.id, this.comment).subscribe(
        comment => 
        {
        this.comments.push(comment)
      }, error =>{
        // console.log(error)
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
          this.comments = com.filter(comment => comment.post.id == this.id)
          this.comId = ''
        }, error =>{
          this.authService.handleError(error)

        }
    )
    }
  }

}
