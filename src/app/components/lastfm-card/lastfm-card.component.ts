import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { LastfmAlbum } from 'src/app/models/lastfm/lastfm-album';
import { LastfmService } from '../lastfm.service';

@Component({
  selector: 'app-lastfm-card',
  templateUrl: './lastfm-card.component.html',
  styleUrls: ['./lastfm-card.component.scss'],
})
export class LastfmCardComponent {
  public isLoading: boolean;
  public feedItems: FeedItem[];
  private numberOfAlbumsToShow = 5;

  constructor(private lastfmService: LastfmService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateWeeklyAlbumChart();
  }

  public async populateWeeklyAlbumChart() {
    this.lastfmService
      .getTopAlbums(this.numberOfAlbumsToShow)
      .pipe(take(1))
      .subscribe((result: LastfmAlbum[]) => {
        this.feedItems = result.map((album) => {
          var imageUrl = (album as any).image.pop()['#text'];
          return {
            title: album.name,
            imageUrl: imageUrl,
            url: album.url,
          } as FeedItem;
        });
        this.isLoading = false;
      });
  }
}
