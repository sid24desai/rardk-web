import { Component } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { HtmlDirective } from '../../../directives/html.directive';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    DateDisplayComponent,
    HtmlDirective,
    MarkdownModule,
  ],
  providers: [provideMarkdown()],
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
    this.route.paramMap
      .pipe(
        take(1),
        switchMap((routeParams: ParamMap) =>
          this.blogService.getBlogPost(routeParams.get('postId')!)
        )
      )
      .subscribe({
        next: (blogPost: BlogPost) => {
          if (!blogPost) {
          }
          this.post = blogPost;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }
}
