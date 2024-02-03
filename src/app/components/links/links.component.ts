import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { MastodonStatus } from 'src/app/models/mastodon/mastodon-status';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { MicroBlogService } from 'src/app/services/microblog.service';
import { MicroBlogPost } from 'src/app/models/microblog-post';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    NgFor,
    SafeHtmlPipe,
    HtmlDirective,
    PageTitleComponent,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent implements OnInit {
  constructor(private microBlogService: MicroBlogService) {}
  public mastodonStatuses: MastodonStatus[];
  public links: MicroBlogPost[];
  public isLoading: boolean;

  async ngOnInit() {
    this.populateLinksFromMicroBlog();
  }

  public populateLinksFromMicroBlog() {
    this.isLoading = true;
    this.microBlogService.getMicroBlogFeed().subscribe((feed) => {
      if (feed && feed.items) {
        this.links = feed.items
          .filter((i) => i.content_html.includes('#sitelink'))
          .map((i: MicroBlogPost) => {
            i.content_html = i.content_html
              .replaceAll('<a', "<a target='_blank'")
              .replaceAll('#sitelink', '');
            return i;
          });
        this.isLoading = false;
      }
    });
  }
}
