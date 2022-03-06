import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model"
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class PostService{
subscribedUsers: any;
constructor(private http: HttpClient,private router: Router){}
postSelected = new EventEmitter<Post>();


posts: Post[] = []

getPosts() { 
    return this.posts.slice()
}

setPosts(updatedPosts: Post[]){
    return this.posts = updatedPosts
}
getPostsasync(){
    return this.http.get<Post[]>('http://127.0.0.1:8000/api/posts')
    
}

getPostAsync(id: string){
    return this.http.get('http://127.0.0.1:8000/api/posts/'+id)
}

getPost(id: string) {
    let post = this.posts.filter(p => p.id == id)
    return post[0]
}



createPost(post: {title: string, body: string}){
    this.http.post('http://127.0.0.1:8000/api/create-post',post)
    .subscribe()
    this.router.navigate(['posts'])
}


updatePost(postID: string, post: {title: string, body: string}) {
    this.http.put('http://127.0.0.1:8000/api/update-post/'+postID, post)
    .subscribe()
    this.router.navigate([''])

}

deletePost(id:string){
    this.http.delete('http://127.0.0.1:8000/api/delete-post/'+id)
    .subscribe();
    this.router.navigate([''])

}


addComment(postID:string, comment:{'body':string}){
    this.http.post('http://127.0.0.1:8000/api/add-comment/'+postID,comment).subscribe()
    this.router.navigate(['posts',postID])
}

getComments(postID:string){
    return this.http.get('http://127.0.0.1:8000/api/get-comments/'+postID)
    .pipe(map(result => {
        return result
    }),
    );

}

editComment(commentID:string, comment:{ 'body': string}, id:string){
    this.http.put('http://127.0.0.1:8000/api/edit-comment/'+commentID, comment).subscribe()
    this.router.navigate(['posts', id])
}

deleteComment(commentID:string, id:string){
    this.http.delete('http://127.0.0.1:8000/api/delete-comment/'+commentID).subscribe()
    this.router.navigate(['posts', id])
}


}