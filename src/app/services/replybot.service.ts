import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuildReplyDefinition } from '../models/bots/replybot/guild-reply-definition';
import { Observable } from 'rxjs';
import { GuildConfiguration } from '../models/bots/replybot/guild-configuration';

@Injectable({
  providedIn: 'root',
})
export class ReplybotService extends ApiService {
  public getReplybotGuildReplyDefinitions(
    discordAccessToken: string,
    guildId: string
  ): Observable<GuildReplyDefinition[]> {
    return this.http.get<GuildReplyDefinition[]>(
      `https://${this.domainUrl}/api/replybot/reply-definitions?accessToken=${discordAccessToken}&guildId=${guildId}`
    );
  }

  public deleteGuildReplyDefinition(
    discordAccessToken: string,
    guildReplyDefinitionId: number
  ): Observable<GuildReplyDefinition[]> {
    return this.http.delete<GuildReplyDefinition[]>(
      `https://${this.domainUrl}/api/replybot/reply-definition?accessToken=${discordAccessToken}&guildReplyDefinitionId=${guildReplyDefinitionId}`
    );
  }

  public createGuildReplyDefinition(
    bodyToUse: any
  ): Observable<GuildReplyDefinition> {
    return this.http.post<GuildReplyDefinition>(
      `https://${this.domainUrl}/api/replybot/reply-definition`,
      bodyToUse
    );
  }

  public updateGuildReplyDefinition(
    bodyToUse: any
  ): Observable<GuildReplyDefinition> {
    return this.http.put<GuildReplyDefinition>(
      `https://${this.domainUrl}/api/replybot/reply-definition`,
      bodyToUse
    );
  }

  public movePriority(
    discordAccessToken: string,
    guildReplyDefinition: GuildReplyDefinition,
    direction: string
  ) {
    return this.http.put<GuildReplyDefinition[]>(
      `https://${
        this.domainUrl
      }/api/replybot/reply-definition/${direction.toLowerCase()}`,
      {
        accessToken: discordAccessToken,
        ...guildReplyDefinition,
      }
    );
  }

  public getReplybotGuildConfigurations(
    discordAccessToken: string
  ): Observable<GuildConfiguration[]> {
    return this.http.get<GuildConfiguration[]>(
      `https://${this.domainUrl}/api/replybot/config/all?accessToken=${discordAccessToken}`
    );
  }

  public getReplybotGuildConfiguration(
    discordAccessToken: string,
    guildId: string
  ): Observable<GuildConfiguration> {
    return this.http.get<GuildConfiguration>(
      `https://${this.domainUrl}/api/replybot/config/?accessToken=${discordAccessToken}&guildId=${guildId}`
    );
  }
}
