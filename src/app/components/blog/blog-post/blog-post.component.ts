import { Component } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { HtmlDirective } from '../../../directives/html.directive';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor, NgIf } from '@angular/common';
import { MarkdownModule, provideMarkdown, MarkdownService } from 'ngx-markdown';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';
import { MastodonStatusFull } from 'src/app/models/mastodon/mastodon-status-full';
import { BlueskyPostFull } from 'src/app/models/bluesky-post-full';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { PostToDisplay } from 'src/app/models/post-to-display';

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
    NgFor,
    SafeHtmlPipe,
    HtmlDirective,
  ],
  providers: [provideMarkdown()],
})
export class BlogPostComponent {
  public post: BlogPost;
  public isLoading: boolean;
  mastodonPosts: PostToDisplay[] = [];
  blueskyPosts: PostToDisplay[] = [];
  bskyUrl: string = 'rardk64.com';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private markdownService: MarkdownService,
    private discussionPostsService: DiscussionPostsService
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
          this.setMeta(blogPost);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });

    this.getDiscussionForPost();
  }

  getDiscussionForPost() {
    this.discussionPostsService.getDiscussionPostsForBlog().subscribe({
      next: (discussion) => {
        const blogPostDiscussion = discussion[this.router.url];
        if (blogPostDiscussion.mastodon) {
          blogPostDiscussion.mastodon.forEach((post: MastodonStatusFull) => {
            const postToDisplay = {
              likes: post.favourites_count,
              shares: post.reblogs_count,
              comments: post.replies_count,
              content: post.content,
              url: post.url,
              commentsUrl: post.url,
              likesUrl: `${post.url}/favourites`,
              sharesUrl: `${post.url}/reblogs`,
            } as PostToDisplay;
            this.mastodonPosts.push(postToDisplay);
          });
        }
        if (blogPostDiscussion.bluesky) {
          blogPostDiscussion.bluesky.forEach((post: BlueskyPostFull) => {
            const splitUri = post.uri.split('/');
            const postId = splitUri[splitUri.length - 1];
            const bskyUrl = `https://bsky.app/profile/${this.bskyUrl}/post/${postId}`;
            const postToDisplay = {
              likes: -1,
              shares: -1,
              comments: -1,
              content: post.value.text,
              url: bskyUrl,
              commentsUrl: bskyUrl,
              likesUrl: `${bskyUrl}/liked-by`,
              sharesUrl: `${bskyUrl}/reposted-by`,
            } as PostToDisplay;
            this.blueskyPosts.push(postToDisplay);
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  setMeta(blogPost: BlogPost) {
    this.meta.updateTag({ property: 'og:title', content: blogPost.attributes.title });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/rarvatar.png',
    });
    this.meta.updateTag({ property: 'og:url', content: this.router.url });
    this.meta.updateTag({
      property: 'og:description',
      content: blogPost.attributes.description,
    });
  }
}
