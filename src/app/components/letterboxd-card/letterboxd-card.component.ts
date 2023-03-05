import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { LetterboxdItem } from 'src/app/models/letterboxd-item';
import { LetterboxdService } from './letterboxd.service';

@Component({
  selector: 'app-letterboxd-card',
  templateUrl: './letterboxd-card.component.html',
  styleUrls: ['./letterboxd-card.component.scss'],
})
export class LetterboxdCardComponent {
  public isLoading: boolean;
  public letterboxdItems: LetterboxdItem[];
  public feedItems: FeedItem[];
  private numberOfMoviesToList = 5;

  constructor(private letterboxdService: LetterboxdService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateLetterboxdItems();
  }

  public async populateLetterboxdItems() {
    this.letterboxdService
      .getLetterboxdFeed()
      .pipe(take(1))
      .subscribe((result: LetterboxdItem[]) => {
        this.letterboxdItems = result.slice(0, this.numberOfMoviesToList);
        this.feedItems = this.letterboxdItems.map((m) => {
          return {
            title: m.title,
            summary: m.summary,
            date: m.watchedDate,
            imageUrl: m.imageUrl,
            isRepeat: m.isRewatch,
            rating: m.rating,
            url: m.url,
          } as FeedItem;
        });
        this.isLoading = false;
      });
  }
}
