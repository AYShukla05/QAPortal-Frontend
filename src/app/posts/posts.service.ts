import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model"
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
  })
export class PostService{
subscribedUsers: any;
constructor(private http: HttpClient,private router: Router, private authService: AuthService){}


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
    return this.http.get<{"Post":Post,"Comments":[]}>('http://127.0.0.1:8000/api/posts/'+id)
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
    .subscribe(
        ()=>{}, err => {
            
            this.authService.handleError(err)

        },
    )
    this.router.navigate(['posts'])

}

deletePost(id:string){
    this.http.delete('http://127.0.0.1:8000/api/delete-post/'+id)
    .subscribe(
        ()=>{}, err => {
            
            this.authService.handleError(err)

        },
    );
    this.router.navigate(['posts'])

}

vote(id:string,vote:{'value':string}){
    return this.http.post<{ 'title': string,'body': string, 'owner': {'name': string, 'id': string}, 'vote_total':number, 'vote_ratio':number}>('http://127.0.0.1:8000/api/add-vote/'+id,vote)
    
}


addComment(postID:string, comment:{'body':string}){
    return this.http.post('http://127.0.0.1:8000/api/add-comment/'+postID,comment)
    }

getComments(postID:string){
    return this.http.get('http://127.0.0.1:8000/api/get-comments/'+postID)
    .pipe(map(result => {
        return result
    }),
    );

}

editComment(commentID:string, comment:{ 'body': string}, id:string){
    this.router.navigate(['posts', id])
    return this.http.put<{'body':string}>('http://127.0.0.1:8000/api/edit-comment/'+commentID, comment)
}

deleteComment(commentID:string, id:string){
    return this.http.delete<any[]>('http://127.0.0.1:8000/api/delete-comment/'+commentID)
}


}