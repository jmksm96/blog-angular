import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Post} from 'src/environments/interface';
import {PostService} from '../../shared/posts.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  submitted = false;
  uSub!:Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder
  ) {
  }

  ngOnDestroy(): void {
        if(this.uSub) {
          this.uSub.unsubscribe()
        }
    }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.post = post
        this.form = this.fb.group({
          title: this.fb.control(post.title, Validators.required),
          text: this.fb.control(post.text, Validators.required),
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    this.uSub =  this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false;
    })
  }
}
