import { Component } from '@angular/core';
import { take } from 'rxjs';
import { BackloggdItem } from 'src/app/models/backloggd-item';
import { FeedItem } from 'src/app/models/feed-item';
import { BackloggdService } from './backloggd.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
  selector: 'app-backloggd-card',
  templateUrl: './backloggd-card.component.html',
  styleUrls: ['./backloggd-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class BackloggdCardComponent {
  public isCurrentGamesFeedLoading: boolean;
  public isReviewsFeedLoading: boolean;
  public reviewsFeedItems: FeedItem[];
  public currentGamesFeedItems: FeedItem[];
  private numberOfCurrentGamesToList = 5;
  private numberOfFinishedGamesToList = 5;
  isRecentlyFinishedGamesError: boolean;
  isCurrentGamesError: boolean;

  constructor(private backloggdService: BackloggdService) {}

  ngOnInit() {
    this.isCurrentGamesFeedLoading = true;
    this.isReviewsFeedLoading = true;
    this.populateBackloggdFeedItems();
    this.populateBackloggdCurrentGamesFeedItems();
  }

  public async populateBackloggdFeedItems() {
    this.backloggdService
      .getBackloggdFeed(this.numberOfFinishedGamesToList)
      .pipe(take(1))
      .subscribe({
        next: (result: BackloggdItem[]) => {
          this.reviewsFeedItems = result.map((m) => {
            return {
              title: m.title,
              summary: m.summary,
              imageUrl: m.imageUrl,
              rating: m.rating,
              url: m.url,
            } as FeedItem;
          });
          this.isReviewsFeedLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isRecentlyFinishedGamesError = true;
        },
      });
  }

  public async populateBackloggdCurrentGamesFeedItems() {
    this.backloggdService
      .getBackloggdCurrentGames(this.numberOfCurrentGamesToList)
      .pipe(take(1))
      .subscribe({
        next: (result: BackloggdItem[]) => {
          this.currentGamesFeedItems = result.map((m) => {
            return {
              title: m.title,
              imageUrl: m.imageUrl,
              url: m.url,
            } as FeedItem;
          });
          this.isCurrentGamesFeedLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isCurrentGamesError = true;
        },
      });
  }
}
