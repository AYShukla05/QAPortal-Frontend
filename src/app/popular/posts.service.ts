import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model"
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class PostService{
constructor(private http: HttpClient,private router: Router){}
postSelected = new EventEmitter<Post>();


private posts: Post[] = []

getPosts() { 
    return this.posts.slice()
}

setPosts(updatedPosts: Post[]){
    return this.posts = updatedPosts
}
getPostsasync(){
    return this.http.get<Post[]>('http://127.0.0.1:8000/api/posts')
    .pipe(map(result => {
        return result
    }),
    );
}

getPost(id: any) {
    let post = this.posts.filter(p => p.id == id)
    return post[0]
}



createPost(post: {title: string, body: string}){
    this.http.post('http://127.0.0.1:8000/api/create-post',post)
    .subscribe()
    this.router.navigate(['popular'])
}


savePost(postID: string, post: {title: string, body: string}) {
    const updatedPostID = postID
    const updatedPost = { title: post.title, body: post.body}
    this.http.put('http://127.0.0.1:8000/api/update-post/'+updatedPostID,updatedPost)
    .subscribe()
    this.router.navigate([''])

}

deletePost(id:string){
    this.http.delete('http://127.0.0.1:8000/api/delete-post/'+id)
    .subscribe(data => console.log(data));
    this.router.navigate([''])

    
}

}