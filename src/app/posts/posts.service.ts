import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from "./post.model"
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
  })
export class PostService{
subscribedUsers: any;
url = "http://127.0.0.1:8000/api/"
constructor(private http: HttpClient,
    private router: Router, 
    private authService: AuthService){}


posts: Post[] = []

getPostsasync(){
    return this.http.get<{"Post":Post, "Vote":string}[]>(this.url+'posts')
    
}

getPostAsync(id: string){
    return this.http.get<{"Post":Post,"Comments":[], "Vote":string}>(this.url+`posts/${id}`)
}

getPost(id: string) {
    let post = this.posts.filter(p => p.id == id)
    return post[0]
}



createPost(post: {title: string, body: string}){
    this.http.post(this.url+'create-post',post)
    .subscribe()
    this.router.navigate(['posts'])
}


updatePost(postID: string, post: {title: string, body: string}) {
    this.http.put(this.url+'update-post/'+postID, post)
    .subscribe(
        ()=>{}, err => {
            
            this.authService.handleError(err)

        },
    )
    this.router.navigate(['posts'])

}

deletePost(id:string){
    this.http.delete(this.url+'delete-post/'+id)
    .subscribe(
        ()=>{}, err => {
            
            this.authService.handleError(err)

        },
    );
    this.router.navigate(['posts'])

}

vote(id:string,vote:{'value':string}){
    return this.http.post<{"Post":Post, "Vote":string}>(this.url+'add-vote/'+id,vote)
    
}


addComment(postID:string, comment:{'body':string}){
    return this.http.post(this.url+'add-comment/'+postID,comment)
    }

getComments(postID:string){
    return this.http.get(this.url+'get-comments/'+postID)
    

}

editComment(commentID:string, comment:{ 'body': string}, id:string){
    this.router.navigate(['posts', id])
    return this.http.put<{'body':string}>(this.url+'edit-comment/'+commentID, comment)
}

deleteComment(commentID:string, id:string){
    return this.http.delete<any[]>(this.url+'delete-comment/'+commentID)
}


}