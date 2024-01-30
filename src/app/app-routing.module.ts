import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './components/collections/collections.component';
import { NowComponent } from './components/now/now.component';
import { LegoSetsComponent } from './components/collections/lego-sets/lego-sets.component';
import { BoardGamesComponent } from './components/collections/board-games/board-games.component';
import { BlogComponent } from './components/blog/blog.component';
import { TimezonesComponent } from './components/bots/timezonebot/timezones/timezones.component';
import { AuthenticationGuard } from './guards/authentication-guard.guard';
import { ReplybotServerSelectorComponent } from './components/bots/replybot/replybot-server-selector/replybot-server-selector.component';
import { ReplyDefinitionsComponent } from './components/bots/replybot/reply-definitions.component';
import { CallbackComponent } from './components/bots/callback/callback.component';
import { BotsComponent } from './components/bots/bots.component';
import { VideoGamesComponent } from './components/collections/video-games/video-games.component';

const routes: Routes = [
  {
    path: 'board-games',
    redirectTo: 'collections/board-games',
    pathMatch: 'full',
  },
  {
    path: 'video-games',
    redirectTo: 'collections/video-games',
    pathMatch: 'full',
  },
  { path: 'lego', redirectTo: 'collections/lego', pathMatch: 'full' },
  { path: 'collections/board-games', component: BoardGamesComponent },
  { path: 'collections/video-games', component: VideoGamesComponent },
  { path: 'collections/lego', component: LegoSetsComponent },
  { path: 'now', component: NowComponent },
  { path: 'collections', component: CollectionsComponent },
  {
    path: 'bots/timezonebot',
    component: TimezonesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'bots/replybot',
    component: ReplybotServerSelectorComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'bots/replybot/reply-definitions',
    component: ReplyDefinitionsComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'bots', component: BotsComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', component: BlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
