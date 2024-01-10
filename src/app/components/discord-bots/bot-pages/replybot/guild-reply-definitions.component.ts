import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { GuildReplyDefinition } from 'src/app/models/bots/replybot/guild-reply-definition';
import { take, forkJoin, timeout, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GuildReplyDefinitionEditorDialogComponent } from './guild-reply-definition-editor-dialog/guild-reply-definition-editor-dialog.component';
import { GuildReplyDefinitionEditorDialogData } from 'src/app/models/bots/replybot/guild-reply-definition-editor-dialog-data';
import { DiscordGuild } from 'src/app/models/bots/discord-guild';
import { GuildConfiguration } from 'src/app/models/bots/replybot/guild-configuration';
import { GuildReplyDefinitionFilterType as GuildReplyDefinitionAttributeType } from 'src/app/models/bots/replybot/guild-reply-definition-filter-type';
import { DiscordUser } from 'src/app/models/bots/discord-user';

@Component({
  selector: 'app-guild-reply-definitions',
  templateUrl: './guild-reply-definitions.component.html',
  styleUrls: ['./guild-reply-definitions.component.css'],
})
export class GuildReplyDefinitionsComponent
  extends PageComponent
  implements OnInit
{
  isLoading: boolean;
  guildReplyDefinitions: GuildReplyDefinition[] = [];
  filteredGuildReplyDefinitions: GuildReplyDefinition[] = [];
  guildId: string;
  guildName: string;
  domainUrl: string;
  isAuthorizedToAdministrate: boolean = false;
  filterOptionsPanelOpenState: boolean;
  filterOptions: GuildReplyDefinitionAttributeType[] = [];
  toolTipMaxLength = 100;
  panelOpenStates: boolean[] = [];
  filterTypes: GuildReplyDefinitionAttributeType[];
  replyDefinitionToDelete?: GuildReplyDefinition;
  discordUser: DiscordUser;

  attributeIsActive: GuildReplyDefinitionAttributeType = {
    key: 'isActive',
    displayName: 'Active',
    filter: (gr) => gr.isActive,
    valueDisplayText: (gr) => '',
    showAsFilter: true,
    showAsAttribute: false,
  };

  attributeIsInactive: GuildReplyDefinitionAttributeType = {
    key: 'isInactive',
    displayName: 'Inactive',
    filter: (gr) => !gr.isActive,
    valueDisplayText: (gr) => '',
    showAsFilter: true,
    showAsAttribute: false,
  };

  attributeHasReplies: GuildReplyDefinitionAttributeType = {
    key: 'hasReplies',
    displayName: 'Replies',
    filter: (gr) => gr.replies && gr.replies.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.replies || gr.replies.length === 0) {
        return '';
      }
      const repliesString = gr.replies.join(',');
      if (repliesString.length > this.toolTipMaxLength) {
        return repliesString.substring(0, this.toolTipMaxLength - 3) + '...';
      }
      return repliesString;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  attributeHasReactions: GuildReplyDefinitionAttributeType = {
    key: 'hasReactions',
    displayName: 'Reactions',
    filter: (gr) => gr.reactions && gr.reactions.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.reactions || gr.reactions.length === 0) {
        return '';
      }
      const reactionsString = gr.reactions.join(',');
      if (reactionsString.length > this.toolTipMaxLength) {
        return reactionsString.substring(0, this.toolTipMaxLength - 3) + '...';
      }
      return reactionsString;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  attributeHasChannelIds: GuildReplyDefinitionAttributeType = {
    key: 'hasChannelIds',
    displayName: 'Channel-Specific',
    filter: (gr) => gr.channelIds && gr.channelIds.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.channelIds || gr.channelIds.length === 0) {
        return '';
      }
      return `${gr.channelIds.length} channel(s)`;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  attributeHasUserIds: GuildReplyDefinitionAttributeType = {
    key: 'hasUserIds',
    displayName: 'User-Specific',
    filter: (gr) => gr.userIds && gr.userIds.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.userIds || gr.userIds.length === 0) {
        return '';
      }
      return `${gr.userIds.length} user(s)`;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  ngOnInit() {
    this.filterTypes = [
      this.attributeIsActive,
      this.attributeIsInactive,
      this.attributeHasReplies,
      this.attributeHasReactions,
      this.attributeHasChannelIds,
      this.attributeHasUserIds,
    ];

    if (this.isLoggedIn()) {
      this.domainUrl = window.location.host;
      this.initializePageContents();
    }
  }

  private initializePageContents() {
    this.isLoading = true;
    this.clearFilters();
    this.clearOpenStates();
    this.route.queryParams
      .pipe(
        take(1),
        switchMap((params) => {
          this.guildId = params['guildId'];
          const accessToken = this.getLoginToken();
          return forkJoin([
            this.replybotService.getReplybotGuildReplyDefinitions(
              accessToken!,
              this.guildId
            ),
            this.discordService.getDiscordGuilds(accessToken!),
            this.replybotService.getReplybotGuildConfiguration(
              accessToken!,
              this.guildId
            ),
            this.discordService.getDiscordUser(accessToken!),
          ]).pipe(
            timeout({
              each: 10000,
              with: () =>
                throwError(
                  () =>
                    new Error(
                      'Timed out waiting for response, logging out to renew access token.'
                    )
                ),
            }),
            map(
              ([
                guildReplyDefinitions,
                discordGuilds,
                guildConfiguration,
                discordUser,
              ]) => {
                return {
                  guildReplyDefinitions,
                  discordGuilds,
                  guildConfiguration,
                  discordUser,
                };
              }
            )
          );
        })
      )
      .subscribe({
        next: (result: {
          guildReplyDefinitions: GuildReplyDefinition[];
          discordGuilds: DiscordGuild[];
          guildConfiguration: GuildConfiguration;
          discordUser: DiscordUser;
        }) => {
          const currentGuild = result.discordGuilds.find(
            (g) => g.id === this.guildId
          );
          if (currentGuild) {
            this.guildName = currentGuild.name;
            this.isAuthorizedToAdministrate =
              currentGuild.permissions.administrator;
          }
          result.guildConfiguration.adminUserIds.forEach((adminUserId) => {
            if (result.discordUser.id === adminUserId) {
              this.isAuthorizedToAdministrate = true;
            }
          });

          this.populateGuildReplyDefinitions(result.guildReplyDefinitions);
          this.discordUser = result.discordUser;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.showSnackBar(
            'Error retrieving page data. Login may have expired, please log in and try again.',
            true
          );
          window.setTimeout(() => this.logOutAndRedirect(), 3000);
        },
      });
  }

  retrieveAndPopulateGuildReplyDefinitions() {
    this.isLoading = true;
    const accessToken = this.getLoginToken();
    this.clearFilters();
    this.clearOpenStates();
    this.replybotService
      .getReplybotGuildReplyDefinitions(accessToken!, this.guildId)
      .pipe(take(1))
      .subscribe({
        next: (guildReplyDefinitions) => {
          this.populateGuildReplyDefinitions(guildReplyDefinitions);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error retrieving server replies', error);
          this.showSnackBar('Error Retrieiving Reply Definitions', true);
        },
      });
  }

  populateGuildReplyDefinitions(guildReplyDefinitions: GuildReplyDefinition[]) {
    if (guildReplyDefinitions) {
      const sortedGuildReplyDefinitions = guildReplyDefinitions.sort(
        (g1, g2) => g1.priority - g2.priority
      );
      this.guildReplyDefinitions = sortedGuildReplyDefinitions;
      this.filteredGuildReplyDefinitions = sortedGuildReplyDefinitions;
    }
  }

  addNewGuildReplyDefinition() {
    this.openEditDialog({
      guildId: this.guildId,
      isActive: true,
    } as GuildReplyDefinitionEditorDialogData);
  }

  getFilters() {
    return this.filterTypes.filter((f) => f.showAsFilter);
  }

  getAttributes() {
    return this.filterTypes.filter((f) => f.showAsAttribute);
  }

  startEdit(guildReplyDefinition: GuildReplyDefinition) {
    const dialogData = {
      id: guildReplyDefinition.id,
      guildId: guildReplyDefinition.guildId,
      mentionAuthor: guildReplyDefinition.mentionAuthor,
      reactions: guildReplyDefinition.reactions,
      replies: guildReplyDefinition.replies,
      requiresBotName: guildReplyDefinition.requiresBotName,
      triggers: guildReplyDefinition.triggers,
      channelIds: guildReplyDefinition.channelIds,
      userIds: guildReplyDefinition.userIds,
      isActive: guildReplyDefinition.isActive,
    } as GuildReplyDefinitionEditorDialogData;

    this.openEditDialog(dialogData);
  }

  addFromCopy(guildReplyDefinition: GuildReplyDefinition) {
    const dialogData = {
      guildId: guildReplyDefinition.guildId,
      mentionAuthor: guildReplyDefinition.mentionAuthor,
      reactions: guildReplyDefinition.reactions,
      replies: guildReplyDefinition.replies,
      requiresBotName: guildReplyDefinition.requiresBotName,
      triggers: guildReplyDefinition.triggers,
      channelIds: guildReplyDefinition.channelIds,
      userIds: guildReplyDefinition.userIds,
      isActive: guildReplyDefinition.isActive,
    } as GuildReplyDefinitionEditorDialogData;

    this.openEditDialog(dialogData);
  }

  async addFromClipboard() {
    const clipboardValue = await navigator.clipboard.readText();

    try {
      const dialogData = JSON.parse(clipboardValue);
      dialogData.guildId = this.guildId;
      this.openEditDialog(dialogData);
    } catch (err) {
      console.error(err);
      this.showSnackBar(
        'Your clipboard data is not a valid reply definition!',
        true
      );
    }
  }

  copyJsonToClipboard(guildReplyDefinition: GuildReplyDefinition) {
    const dialogData = {
      mentionAuthor: guildReplyDefinition.mentionAuthor,
      reactions: guildReplyDefinition.reactions,
      replies: guildReplyDefinition.replies,
      requiresBotName: guildReplyDefinition.requiresBotName,
      triggers: guildReplyDefinition.triggers,
      isActive: guildReplyDefinition.isActive,
    } as GuildReplyDefinitionEditorDialogData;

    if (this.clipboard.copy(JSON.stringify(dialogData))) {
      this.showSnackBar('Copied reply definition to clipboard!', false);
    } else {
      this.showSnackBar('There was a problem copying. Please try again.', true);
    }
  }

  showDeleteConfirm(guildReplyDefinition: GuildReplyDefinition) {
    this.replyDefinitionToDelete = guildReplyDefinition;
  }

  cancelDelete() {
    this.replyDefinitionToDelete = undefined;
  }

  doDelete() {
    if (this.replyDefinitionToDelete) {
      var accessToken = this.getLoginToken();
      this.replybotService
        .deleteGuildReplyDefinition(
          accessToken!,
          this.replyDefinitionToDelete.id
        )
        .pipe(take(1))
        .subscribe({
          next: (_) => {
            this.retrieveAndPopulateGuildReplyDefinitions();
            this.showSnackBar('Reply Definition Deleted', false);
          },
          error: (error) => {
            this.showSnackBar('Error deleting reply definition', true);
            console.error('error deleting', error);
          },
        });
    }
  }

  getOpen(index: number) {
    return this.panelOpenStates[index];
  }

  setOpen(index: number, isOpen: boolean) {
    this.panelOpenStates[index] = isOpen;
  }

  clearOpenStates() {
    this.panelOpenStates = [];
  }

  hasFilters(): boolean {
    return this.filterOptions.length > 0;
  }

  getActiveFilterDisplayNames(): string[] {
    return this.filterOptions.map((ft) => ft.displayName);
  }

  applyFilters() {
    this.clearOpenStates();
    if (this.filterOptions.length === 0) {
      this.filteredGuildReplyDefinitions = this.guildReplyDefinitions;
      return;
    }
    this.filteredGuildReplyDefinitions = this.guildReplyDefinitions.filter(
      (gr) => {
        let filterResult = true;

        this.filterOptions.forEach((filter) => {
          filterResult = filterResult && filter.filter(gr);
        });

        return filterResult;
      }
    );
  }

  clearFilters() {
    this.filterOptions = [];
    this.applyFilters();
  }

  private openEditDialog(dialogData?: GuildReplyDefinitionEditorDialogData) {
    // add editing user to dialog data
    if (dialogData) {
      dialogData.user = this.discordUser;
    } else {
      dialogData = {
        user: this.discordUser,
      } as GuildReplyDefinitionEditorDialogData;
    }

    // open dialog
    let dialogRef = this.dialog.open(
      GuildReplyDefinitionEditorDialogComponent,
      {
        height: '800px',
        width: '700px',
        data: dialogData,
      }
    );
    dialogRef.afterClosed().subscribe((guildReplyDefinitionToSave) => {
      if (guildReplyDefinitionToSave) {
        this.saveGuildReplyDefinition(guildReplyDefinitionToSave);
      }
    });
  }

  movePriority(direction: string, guildReplyDefinition: GuildReplyDefinition) {
    var accessToken = this.getLoginToken();
    this.replybotService
      .movePriority(accessToken!, guildReplyDefinition, direction)
      .pipe(take(1))
      .subscribe((_) => {
        this.retrieveAndPopulateGuildReplyDefinitions();
      });
  }

  saveGuildReplyDefinition(guildReplyDefinition: GuildReplyDefinition) {
    var accessToken = this.getLoginToken();

    const bodyToUse = {
      accessToken: accessToken,
      ...guildReplyDefinition,
    };
    var observableToUse = guildReplyDefinition.id
      ? this.replybotService.updateGuildReplyDefinition(bodyToUse)
      : this.replybotService.createGuildReplyDefinition(bodyToUse);

    observableToUse.pipe(take(1)).subscribe({
      next: (_) => {
        this.retrieveAndPopulateGuildReplyDefinitions();
        this.showSnackBar('Reply Definition Saved', false);
      },
      error: (error) => {
        this.showSnackBar('Error saving reply definition', true);
        console.error('error saving', error);
      },
    });
  }

  backToGuildSelector() {
    this.router.navigate(['replybot-server-selector']);
  }
}
