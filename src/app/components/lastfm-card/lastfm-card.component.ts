import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { LastfmAlbum } from 'src/app/models/lastfm/lastfm-album';
import { LastfmArtist } from 'src/app/models/lastfm/lastfm-artist';
import { LastfmService } from '../lastfm.service';

@Component({
  selector: 'app-lastfm-card',
  templateUrl: './lastfm-card.component.html',
  styleUrls: ['./lastfm-card.component.scss'],
})
export class LastfmCardComponent {
  public isLoading: boolean;
  public topAlbumFeedItems: FeedItem[];
  public topArtistFeedItems: FeedItem[];
  private numberOfAlbumsToShow = 5;
  private numberOfArtistsToShow = 5;

  constructor(private lastfmService: LastfmService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateTopAlbums();
    this.populateTopArtists();
  }

  public async populateTopAlbums() {
    this.lastfmService
      .getTopAlbums(this.numberOfAlbumsToShow)
      .pipe(take(1))
      .subscribe((result: LastfmAlbum[]) => {
        this.topAlbumFeedItems = result.map((album) => {
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

  public async populateTopArtists() {
    this.lastfmService
      .getTopArtists(this.numberOfArtistsToShow)
      .pipe(take(1))
      .subscribe((result: LastfmArtist[]) => {
        this.topArtistFeedItems = result.map((artist) => {
          return {
            title: artist.name,
            url: artist.url,
          } as FeedItem;
        });
        this.isLoading = false;
      });
  }
}
