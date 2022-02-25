import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../post.model';

@Component({
  selector: 'app-popular-item',
  templateUrl: './popular-item.component.html',
  styleUrls: ['./popular-item.component.css']
})
export class PopularItemComponent implements OnInit {
  @Input() post!: Post;
  @Output() postSelected = new EventEmitter<void>();
  @Output() postDeleted = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  onSelected(){
    this.postSelected.emit()
  }

  onDeleted(){
    this.postDeleted.emit()
    console.log("Event from popular-item")

  }
}
