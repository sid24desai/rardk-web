import { Component } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from '../blog.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';

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
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta
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
    if (!blogPost) {
      this.router.navigate(['blog']);
      return;
    }
    this.post = blogPost;
    this.meta.updateTag({ property: 'og:title', content: this.post.title });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/rarvatar.png',
    });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    this.meta.updateTag({
      property: 'og:description',
      content: this.post.summary,
    });
  }
}
