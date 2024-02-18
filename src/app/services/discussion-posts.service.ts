import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscussionPostsService {
  private discussionBlogPostsUrl: string = `${environment.jsonFileUrl}social-finder/discussion-blog-posts.json`;
  private discussionLinksPostsUrl: string = `${environment.jsonFileUrl}social-finder/discussion-links-posts.json`;

  constructor(private http: HttpClient) {}

  public getDiscussionPostsForBlog(): Observable<any> {
    return this.http.get<any>(this.discussionBlogPostsUrl);
  }

  public getDiscussionPostsForLinks(): Observable<any> {
    return this.http.get<any>(this.discussionLinksPostsUrl);
  }
}
