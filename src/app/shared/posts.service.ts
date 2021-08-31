import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/environments/interface';
import { environment } from './../../environments/environment.prod';
import { FbCreateResponse } from './interface';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fDBUrlL}/posts.json`, post).pipe(
      map((res: FbCreateResponse) => {
        return {
          ...post,
          id: res.name,
          date: new Date(),
        };
      })
    );
  }

  remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fDBUrlL}/posts/${id}.json`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fDBUrlL}/posts.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }
}
