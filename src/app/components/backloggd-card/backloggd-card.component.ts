import { Component } from '@angular/core';
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
  public feedItems: FeedItem[];
  private numberOfGamesToList = 5;

  constructor(private backloggdService: BackloggdService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateBackloggdItems();
  }

  public async populateBackloggdItems() {
    var subscription = this.backloggdService
      .getBackloggdFeed(this.numberOfGamesToList)
      //.pipe(take(1))
      .subscribe((result: BackloggdItem[]) => {
        this.feedItems = result.map((m) => {
          return {
            title: m.title,
            summary: m.summary,
            imageUrl: m.imageUrl,
            rating: m.rating,
            url: m.url,
          } as FeedItem;
        });
        this.isLoading = false;
        subscription.unsubscribe();
      });
  }
}
