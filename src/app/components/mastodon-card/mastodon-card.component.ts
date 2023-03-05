import { Component, OnInit } from '@angular/core';
import { MastodonStatus } from 'src/app/models/mastodon/mastodon-status';
import { MastodonService } from './mastodon.service';

@Component({
  selector: 'app-mastodon-card',
  templateUrl: './mastodon-card.component.html',
  styleUrls: ['./mastodon-card.component.scss'],
})
export class MastodonCardComponent implements OnInit {
  constructor(private mastodonService: MastodonService) {}
  public mastodonStatuses: MastodonStatus[];

  async ngOnInit() {
    this.populateMastodonFeed();
  }

  public async populateMastodonFeed() {
    (await this.mastodonService.getMastodonFeed()).subscribe(
      (result: MastodonStatus[]) =>
        (this.mastodonStatuses = result.map((s) => {
          s.content = s.content;
          return s;
        }))
    );
  }

  public openMastodonStatus($event: MouseEvent, status: MastodonStatus) {
    // found at https://stackoverflow.com/a/64279838/386869
    if ($event.button <= 1) {
      window.open(status.url);
    }
  }
}
