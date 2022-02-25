import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-popular-details',
  templateUrl: './popular-details.component.html',
  styleUrls: ['./popular-details.component.css']
})
export class PopularDetailsComponent implements OnInit {
  @Input() post!: Post;
  constructor() { }

  ngOnInit(): void {
  }

}
