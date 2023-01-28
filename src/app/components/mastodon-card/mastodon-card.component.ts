import { Component, OnInit } from '@angular/core';
import { MastodonService } from './mastodon.service';

@Component({
  selector: 'app-mastodon-card',
  templateUrl: './mastodon-card.component.html',
  styleUrls: ['./mastodon-card.component.scss'],
})
export class MastodonCardComponent implements OnInit {
  constructor(private mastodonService: MastodonService) {}

  async ngOnInit() {
    await this.mastodonService.getMastodonFeed();
  }
}
