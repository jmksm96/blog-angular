import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/environments/interface';
import { PostService } from './../../shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.pSub = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: any) {
    return this.posts.filter(i => i.id !== id);
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}
