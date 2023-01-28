import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from 'masto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MastodonService {
  configUrl = 'assets/config.json';
  constructor(private http: HttpClient) {}

  async getMastodonFeed() {
    const masto = await login({
      url: environment.mastodonUrl,
      accessToken: environment.mastodonAccessToken,
    });

    await masto.v1.statuses.create({
      status: 'Testing',
      visibility: 'public',
    });
  }
}
