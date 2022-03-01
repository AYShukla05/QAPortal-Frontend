import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../posts.service';

@Component({
  selector: 'app-popular-item',
  templateUrl: './popular-item.component.html',
  styleUrls: ['./popular-item.component.css']
})
export class PopularItemComponent implements OnInit {
  @Input() post!: Post;
  

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }
  

  onDeleted(){
    this.postService.postDeleted.emit(this.post)
    // console.log("Event from popular-item")

  }
}
