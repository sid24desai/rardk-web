import { Component, HostListener, OnInit } from '@angular/core';
import { MastodonStatus } from 'src/app/models/mastodon-status';
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
          s.content = s.content; //this.strip(s.content);
          return s;
        }))
    );
  }

  public strip(html: string) {
    // found at https://stackoverflow.com/a/47140708/386869
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  public openMastodonStatus($event: MouseEvent, status: MastodonStatus) {
    // found at https://stackoverflow.com/a/64279838/386869
    if ($event.button <= 1) {
      window.open(status.url);
    }
  }
}
