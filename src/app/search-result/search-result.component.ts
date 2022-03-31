import { Component, Input, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Post } from '../posts/post.model';
import { PostService } from '../posts/posts.service';
import { ProfilesService } from '../profile/profiles.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchingPosts: boolean = true;
  searchingProfiles: boolean = false;
  popularPosts:Post[] = []
  popularProfiles:any[] = []
  query = ''
  // Pagination Controls
  page: any = 1;
  count: any = 6;
  constructor(private postService: PostService, 
    private profilesService: ProfilesService,
    public headerService: HeaderService) { }

  ngOnInit(): void {
    
    this.headerService.dataChanged.subscribe(
      query=>{
        this.query = query
        this.search(query)
      }
    )
  }

  search(query: string) {
  
    this.popularPosts = this.postService.posts
    .filter(post => this.postService.posts
      .map(post => post.title.toLocaleLowerCase()
      )
    .filter(title => title.includes(query.toLowerCase()))
    .includes(post.title.toLowerCase())
    )

    this.popularProfiles = this.profilesService.profiles.filter(profile => this.profilesService.profiles.map(profile => profile.name.toLocaleLowerCase())
    .filter(name => name.includes(query.toLowerCase())).includes(profile.name.toLowerCase()))

  }
  searchPosts(){
    this.searchingPosts = true
    this.searchingProfiles = false
  }
  searchProfiles(){
    
    this.searchingPosts = false
    this.searchingProfiles = true
  }
}
