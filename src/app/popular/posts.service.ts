import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model"
@Injectable()
export class PostService{
    constructor(private http: HttpClient){}
postSelected = new EventEmitter<Post>();
postDeleted = new EventEmitter<Post>();


private posts: Post[] = [{owner: 'Profile 1', title: 'First Post', body:"This is the first post", id:1}, 
{owner: 'Profile 2',title: 'Second Post', body:"This is the second post", id:2}, 
{owner: 'Profile 3', title: 'Third Post', body:"This is the first post", id:3},
{owner: 'Profile 1', title: 'Fourth Post', body:"This is the first post", id:4} ]


getPosts() { 
   
    console.log("From inital")
    return this.posts
    // return this.http
    //   .get<Post[]>('http://127.0.0.1:8000/api/posts')
}
getPostsasync(){
    return this.http.get<Post[]>('http://127.0.0.1:8000/api/posts')
    .pipe(map(result => {
        console.log("Result:",result)
        return result.map(post => {console.log("Post:",post);return {...post}})
    }),
    );
}

getPost(id: number) {
    return this.posts[id]
}

}