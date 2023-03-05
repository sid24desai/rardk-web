import { Component, Input } from '@angular/core';
import { FeedItem } from 'src/app/models/feed-item';

@Component({
  selector: 'app-feed-posters',
  templateUrl: './feed-posters.component.html',
  styleUrls: ['./feed-posters.component.scss'],
})
export class FeedPostersComponent {
  @Input() sectionTitle: string;
  @Input() ratingMax: number;
  @Input() isLoading: boolean;
  @Input() feedItems: FeedItem[];
}
