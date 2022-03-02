import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  private routeSub!: Subscription;
  id: string | undefined
  constructor(private postService: PostService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'] 
  })
  
}
  onSubmit(form: NgForm){
    const value = form.value
    const newPost = { title: value.title, body: value.body}
    console.log("Inside edit",this.route.snapshot.params)
    
    if (this.id==undefined){
      this.postService.createPost(newPost)
      }
    else{
    this.postService.savePost(this.id, newPost)
    this.id = undefined
    }
    form.reset();
  }
  onDestroy(){
    this.routeSub.unsubscribe();
  }
}
