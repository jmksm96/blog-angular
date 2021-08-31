import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/environments/interface';
import { PostService } from './../../shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.form = this.fb.group({
          title: this.fb.control(post.title, Validators.required),
          text: this.fb.control(post.text, Validators.required),
        });
      });
  }
  submit() {}
}
