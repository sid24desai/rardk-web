import { Component } from '@angular/core';
import { take } from 'rxjs';
import { BackloggdItem } from 'src/app/models/backloggd-item';
import { FeedItem } from 'src/app/models/feed-item';
import { BackloggdService } from './backloggd.service';

@Component({
  selector: 'app-backloggd-card',
  templateUrl: './backloggd-card.component.html',
  styleUrls: ['./backloggd-card.component.scss'],
})
export class BackloggdCardComponent {
  public isLoading: boolean;
  public reviewsFeedItems: FeedItem[];
  public currentGamesFeedItems: FeedItem[];
  private numberOfCurrentGamesToList = 5;
  private numberOfFinishedGamesToList = 10;

  constructor(private backloggdService: BackloggdService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateBackloggdFeedItems();
    this.populateBackloggdCurrentGamesFeedItems();
  }

  public async populateBackloggdFeedItems() {
    this.backloggdService
      .getBackloggdFeed(this.numberOfFinishedGamesToList)
      .pipe(take(1))
      .subscribe((result: BackloggdItem[]) => {
        this.reviewsFeedItems = result.map((m) => {
          return {
            title: m.title,
            summary: m.summary,
            imageUrl: m.imageUrl,
            rating: m.rating,
            url: m.url,
          } as FeedItem;
        });
        this.isLoading = false;
      });
  }

  public async populateBackloggdCurrentGamesFeedItems() {
    this.backloggdService
      .getBackloggdCurrentGames(this.numberOfCurrentGamesToList)
      .pipe(take(1))
      .subscribe((result: BackloggdItem[]) => {
        this.currentGamesFeedItems = result.map((m) => {
          return {
            title: m.title,
            imageUrl: m.imageUrl,
            url: m.url,
          } as FeedItem;
        });
        this.isLoading = false;
      });
  }
}
