import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/environments/interface';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = '') {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
  }
}
