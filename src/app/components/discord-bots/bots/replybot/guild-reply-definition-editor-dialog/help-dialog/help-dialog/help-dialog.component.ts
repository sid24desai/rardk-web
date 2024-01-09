import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GuildReplyDefinitionEditorDialogComponent } from '../../guild-reply-definition-editor-dialog.component';
import { HelpKeywordDetail } from 'src/app/models/bots/replybot/help-keyword-detail';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css'],
})
export class HelpDialogComponent {
  public dialogData: any;
  public keywords: HelpKeywordDetail[] = [
    {
      keyword: '{{BOTNAME}}',
      description: `The bot's name. Always use this, never use the bot's names specifically. Can be used in both triggers and replies.`,
    },
    {
      keyword: '{{MESSAGE}}',
      description: `Use this in a reply to include the original message.`,
    },
    {
      keyword: '{{MESSAGEWITHOUTREPLYBOT}}',
      description: `Use this in a reply to include the original message, without the bot's name included.`,
    },
    {
      keyword: '{{MESSAGEUPPERCASE}}',
      description: `Use this in a reply to include the original message, but all in uppercase letters.`,
    },
    {
      keyword: '{{MESSAGEWITHOUTTRIGGER}}',
      description: `Use this in a reply to include the original message, without the trigger portion.`,
    },
    {
      keyword: '{{USERNAME}}',
      description: `Use this in a reply to include the username (non-mention) of the user who triggered this reply.`,
    },
    {
      keyword: '{{USERTAG}}',
      description: `Use this in a reply to include the username of the user who triggered this reply.`,
    },
    {
      keyword: '{{DELETEMESSAGE}}',
      description: `Use this in a reply to delete the original message.`,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<GuildReplyDefinitionEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogData = data;
  }

  copyToClipboard(keyword: string) {}

  closeHelp() {
    this.dialogRef.close();
  }
}
