import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { GithubCardComponent } from './components/github-card/github-card.component';
import { MastodonCardComponent } from './components/mastodon-card/mastodon-card.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NowComponent } from './components/now/now.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { HtmlDirective } from './directives/html.directive';
import { CollectionsComponent } from './components/collections/collections.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { LetterboxdCardComponent } from './components/letterboxd-card/letterboxd-card.component';
import { FeedPostersComponent } from './components/shared/feed-posters/feed-posters.component';
import { BackloggdCardComponent } from './components/backloggd-card/backloggd-card.component';
import { LastfmCardComponent } from './components/lastfm-card/lastfm-card.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubCardComponent,
    MastodonCardComponent,
    SafeHtmlPipe,
    NowComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    HtmlDirective,
    CollectionsComponent,
    SocialLinksComponent,
    LetterboxdCardComponent,
    FeedPostersComponent,
    BackloggdCardComponent,
    LastfmCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
