import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/environments/interface';
import { PostService } from '../../shared/posts.service';
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;
  dSub!: Subscription;
  searchStr = '';
  constructor(private postService: PostService, private alertService: AlertService) {}

  ngOnInit() {
    this.pSub = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string | undefined) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning('Пост был удален')
    });


  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
