import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscussionPostsService {
  private discussionBlogPostsUrl: string = `${environment.apiUrl}now/json/discussion-blog-posts`;
  private discussionLinksPostsUrl: string = `${environment.apiUrl}now/json/discussion-links`;

  constructor(private http: HttpClient) {}

  public getDiscussionPostsForBlog(): Observable<any> {
    return this.http.get<any>(this.discussionBlogPostsUrl);
  }

  public getDiscussionPostsForLinks(): Observable<any> {
    return this.http.get<any>(this.discussionLinksPostsUrl);
  }
}
