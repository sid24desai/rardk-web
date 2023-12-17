import { Component } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from '../blog.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
  public post: BlogPost;
  public isLoading: boolean;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    combineLatest([this.blogService.getBlogPosts(), this.route.paramMap])
      .pipe(
        take(1),
        map(([blogPosts, routeParams]) => {
          {
            return {
              blogPosts: blogPosts,
              routeParams: routeParams,
            };
          }
        })
      )
      .subscribe({
        next: (result: { blogPosts: BlogPost[]; routeParams: ParamMap }) => {
          this.findAndSetBlogPost(result.blogPosts, result.routeParams);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  private findAndSetBlogPost(blogPosts: BlogPost[], routeParams: ParamMap) {
    const blogPost = blogPosts.find(
      (p) => p.postId === routeParams.get('postId')
    );
    this.post = blogPost!;
  }
}
