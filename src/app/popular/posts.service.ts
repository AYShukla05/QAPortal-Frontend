import { EventEmitter, Injectable } from '@angular/core';

import { Post } from "./post.model"

export class PostService{
postSelected = new EventEmitter<Post>();
postDeleted = new EventEmitter<Post>();


private posts: Post[] = [{owner: 'Profile 1', title: 'First Post', body:"This is the first post", id:1}, 
{owner: 'Profile 2',title: 'Second Post', body:"This is the second post", id:2}, 
{owner: 'Profile 3', title: 'Third Post', body:"This is the first post", id:3},
{owner: 'Profile 1', title: 'Fourth Post', body:"This is the first post", id:4} ]


getPosts() { 
    return this.posts
}

getPost(id: number) {
    return this.posts[id]
}

}