import { Injectable } from '@angular/core';
import { DiscordGuild } from '../models/bots/discord-guild';
import { ApiService } from './api.service';
import { GuildMember } from '../models/bots/replybot/guild-member';
import { Observable } from 'rxjs';
import { DiscordAuthResponse } from '../models/bots/discord-auth-response';
import { DiscordUser } from '../models/bots/discord-user';

@Injectable({
  providedIn: 'root',
})
export class DiscordService extends ApiService {
  public getAccessToken(code: string) {
    return this.http.get<DiscordAuthResponse>(
      `https://${this.domainUrl}/api/discord/access-token?code=${code}&redirectUrl=https://${this.domainUrl}/callback`
    );
  }

  public refreshAccessToken(refreshToken: string) {
    return this.http.get<DiscordAuthResponse>(
      `https://${this.domainUrl}/api/discord/access-token?refreshToken=${refreshToken}`
    );
  }

  public getDiscordGuilds(accessToken: string) {
    return this.http.get<DiscordGuild[]>(
      `https://${this.domainUrl}/api/discord/guilds?accessToken=${accessToken}`
    );
  }

  public getDiscordUser(accessToken: string) {
    return this.http.get<DiscordUser>(
      `https://${this.domainUrl}/api/discord/user?accessToken=${accessToken}`
    );
  }

  public getDiscordUserGuildMember(
    accessToken: string,
    guildId: string
  ): Observable<GuildMember> {
    return this.http.get<GuildMember>(
      `https://${this.domainUrl}/api/discord/guild-member?accessToken=${accessToken}&guildId=${guildId}`
    );
  }
}
