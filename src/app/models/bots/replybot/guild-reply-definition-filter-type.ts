import { GuildReplyDefinition } from './guild-reply-definition';

export class GuildReplyDefinitionFilterType {
  public key: string;
  public displayName: string;
  public filter: (i: GuildReplyDefinition) => any;
  public valueDisplayText: (i: GuildReplyDefinition) => any;
  public showAsFilter: boolean;
  public showAsAttribute: boolean;
}
