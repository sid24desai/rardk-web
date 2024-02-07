import { Component } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { HtmlDirective } from '../../../directives/html.directive';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MarkdownModule, provideMarkdown, MarkdownService } from 'ngx-markdown';

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
    RouterLink,
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
    private meta: Meta,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}"><span class="header-link"></span></a>${text}</h${level}>`;
    };

    this.markdownService.renderer.link = (
      href: string,
      title: string | null | undefined,
      text: string
    ): string => {
      return `<a href="${href}" target="_blank">${text}</a>`;
    };

    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return `<a href="${href}" target="_blank" title="${text}"><img src="${href}" alt="${text}" /></a>`;
    };

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
            this.router.navigate(['home']);
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
