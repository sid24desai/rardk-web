import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { GithubSearchResult } from 'src/app/models/github/github-search-result';
import { GithubService } from './github.service';

@Component({
  selector: 'app-github-card',
  templateUrl: './github-card.component.html',
  styleUrls: ['./github-card.component.scss'],
})
export class GithubCardComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  public feedItems: FeedItem[];
  public isLoading: boolean;
  private numberOfRepositoriesToTake = 5;
  private filteredRepositoryNames = [
    'lego-sets-list',
    'repost-sites-ignore-list',
    'justwatch-country-config',
  ];

  ngOnInit() {
    this.isLoading = true;
    this.populateGithubSearchResults();
  }

  public async populateGithubSearchResults() {
    this.githubService
      .getGithubRecentlyUpdatedRepositories()
      .pipe(take(1))
      .subscribe((result: GithubSearchResult) => {
        var repos = result.items
          .filter((r) => !r.archived)
          .filter((r) => !this.filteredRepositoryNames.includes(r.name))
          .slice(0, this.numberOfRepositoriesToTake);
        this.feedItems = repos.map((r) => {
          return {
            title: r.name,
            url: r.html_url,
            summary: r.description,
          } as FeedItem;
        });
        this.isLoading = false;
      });
  }
}
