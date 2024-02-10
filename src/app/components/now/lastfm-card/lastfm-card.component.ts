import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { LastfmAlbum } from 'src/app/models/lastfm/lastfm-album';
import { LastfmArtist } from 'src/app/models/lastfm/lastfm-artist';
import { LastfmService } from './lastfm.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
  selector: 'app-lastfm-card',
  templateUrl: './lastfm-card.component.html',
  styleUrls: ['./lastfm-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class LastfmCardComponent {
  public isTopAlbumsLoading: boolean;
  public isTopArtistsLoading: boolean;
  public topAlbumFeedItems: FeedItem[];
  public topArtistFeedItems: FeedItem[];
  private numberOfAlbumsToShow = 5;
  private numberOfArtistsToShow = 5;
  isTopAlbumsError: boolean;
  isTopArtistsError: boolean;

  constructor(private lastfmService: LastfmService) {}

  ngOnInit() {
    this.isTopAlbumsLoading = true;
    this.isTopArtistsLoading = true;
    this.populateTopAlbums('1month');
    this.populateTopArtists('1month');
  }

  public async populateTopAlbums(period: string) {
    this.lastfmService
      .getTopAlbums(this.numberOfAlbumsToShow, period)
      .pipe(take(1))
      .subscribe({
        next: (result: LastfmAlbum[]) => {
          this.topAlbumFeedItems = result.map((album) => {
            const imageUrl = (album as any).image.pop()['#text'];
            return {
              title: album.name,
              imageUrl: imageUrl,
              url: album.url,
            } as FeedItem;
          });
          this.isTopAlbumsLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isTopAlbumsError = true;
        },
      });
  }

  public async populateTopArtists(period: string) {
    this.lastfmService
      .getTopArtists(this.numberOfArtistsToShow, period)
      .pipe(take(1))
      .subscribe({
        next: (result: LastfmArtist[]) => {
          this.topArtistFeedItems = result.map((artist) => {
            return {
              title: artist.name,
              url: artist.url,
            } as FeedItem;
          });
          this.isTopArtistsLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isTopArtistsError = true;
        },
      });
  }
}
