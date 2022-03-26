import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-edit-component',
  templateUrl: './post-edit-component.component.html',
  styleUrls: ['./post-edit-component.component.css']
})
export class PostEditComponentComponent implements OnInit {
  id: string | undefined
  postEdit!:FormGroup
  loggedInId: string = this.authService.loggedProfile.id
  post: {title: string, body: string, owner?:{}} = {'title':'', 'body':'', 'owner':{}}
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] 
      if(this.id!==undefined){
        this.post = this.postService.getPost(this.id)
        if (this.post == undefined){
          this.postService.getPostAsync(this.id).subscribe(
            (resp)=>{
              this.post = resp['Post'];
              console.log(this.post)
              // if(this.router.url.includes('edit')&&this.post.owner!==this.authService.loggedProfile){
              //   this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/edit'))])
              // }
              this.postEdit = new FormGroup({
                'title': new FormControl(this.post?this.post.title:null, Validators.required),
                'body': new FormControl(this.post?this.post.body:null, Validators.required)
              })
            }, 
            error=>{
              this.authService.handleError(error)

            })
          }}
        })

        if (this.router.url == "/new"){
          this.post = {
            'title': '', 
            'body':''
    }
  }
  // if(this.router.url.includes('edit')&&this.post.owner!==this.authService.loggedProfile){
  //   this.router.navigate([this.router.url.substring(0, this.router.url.indexOf('/edit'))])
  // }
  this.postEdit = new FormGroup({
    'title': new FormControl(this.post?this.post.title:null, Validators.required),
    'body': new FormControl(this.post?this.post.body:null, Validators.required)
  
  })
  console.log(this.post)
}

  onSubmit(){
    const value = this.postEdit.value
    const post= {
      title: value['title'],
      body: value['body']
  } 
  this.post = post;
  if (this.id==undefined){
    this.postService.createPost(post)
      }
      else{
        this.postService.updatePost(this.id,post)
      }
    this.postEdit.reset();
  }
  

}
