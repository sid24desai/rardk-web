import { Component, Input, OnInit } from '@angular/core';
import { FeedItem } from 'src/app/models/feed-item';

@Component({
  selector: 'app-feed-posters',
  templateUrl: './feed-posters.component.html',
  styleUrls: ['./feed-posters.component.scss'],
})
export class FeedPostersComponent implements OnInit {
  @Input() sectionTitle: string;
  @Input() ratingMax: number;
  @Input() isLoading: boolean;
  @Input() feedItems: FeedItem[];
  @Input() displayType: string;
  @Input() profileUrl?: string;
  @Input() profileName?: string;

  public isList: boolean;
  public isPoster: boolean;

  ngOnInit() {
    this.isList = this.displayType.toLowerCase() === 'list';
    this.isPoster = this.displayType.toLowerCase() === 'poster';
  }
}
