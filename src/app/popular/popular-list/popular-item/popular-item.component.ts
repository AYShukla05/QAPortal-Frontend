import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../post.model';
import { PostService } from '../../posts.service';

@Component({
  selector: 'app-popular-item',
  templateUrl: './popular-item.component.html',
  styleUrls: ['./popular-item.component.css']
})
export class PopularItemComponent implements OnInit {
  @Input() post!: Post;
  id: string | undefined


  constructor(private postService: PostService,private route: ActivatedRoute ) { }

  ngOnInit(): void {

}
  
  
  
}
