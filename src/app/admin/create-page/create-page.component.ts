import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../environments/interface';
import { PostService } from './../../shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      text: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
    });
  }

  submit() {
    if (this.postForm.invalid) {
      return;
    }
    const post: Post = {
      author: this.postForm.value.author,
      text: this.postForm.value.text,
      title: this.postForm.value.title,
      date: new Date(),
    };

    this.postService.create(post).subscribe(() => {
      this.postForm.reset();
    });

    console.log(this.postForm.value);
  }
}
