import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-edit-component',
  templateUrl: './post-edit-component.component.html',
  styleUrls: ['./post-edit-component.component.css']
})
export class PostEditComponentComponent implements OnInit {
  private routeSub!: Subscription;
  id: string | undefined
  post= {title: "Dummy Title", body: "Dummy Body"}
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'] 
  })
  }

  onSubmit(form: NgForm){
    const value = form.value
    console.log(form)
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
    form.reset();
  }

}
