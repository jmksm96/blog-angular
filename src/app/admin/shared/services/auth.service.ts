import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface';

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

  get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    return this.http.post('', user);
  }
  logout() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {}
}
