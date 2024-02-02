import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MicroBlogFeed } from '../models/microblog-feed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MicroBlogService {
  constructor(private http: HttpClient) {}

  getMicroBlogFeed(): Observable<MicroBlogFeed> {
    return this.http.get<MicroBlogFeed>(`${environment.microBlogFeedUrl}`);
  }
}
