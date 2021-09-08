import {Component, OnInit} from '@angular/core';
import {PostService} from "../shared/posts.service";
import {Post} from "../../environments/interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<Post[]>

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    debugger
    this.posts$ = this.postService.getAllPosts()
  }

}
