import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newPost = new Post('profile 2', value.title, value. body, this.postService.getPosts().length+1)
    this.postService.getPosts().push(newPost)
    // console.log(this.postService.getPosts())
    form.reset();
  }
}
