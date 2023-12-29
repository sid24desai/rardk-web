import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GithubCardComponent } from './components/now/github-card/github-card.component';
import { MastodonCardComponent } from './components/mastodon-card/mastodon-card.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NowComponent } from './components/now/now.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { HtmlDirective } from './directives/html.directive';
import { CollectionsComponent } from './components/collections/collections.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { LetterboxdCardComponent } from './components/now/letterboxd-card/letterboxd-card.component';
import { FeedPostersComponent } from './components/shared/feed-posters/feed-posters.component';
import { BackloggdCardComponent } from './components/now/backloggd-card/backloggd-card.component';
import { LastfmCardComponent } from './components/now/lastfm-card/lastfm-card.component';
import { SerializdCardComponent } from './components/now/serializd-card/serializd-card.component';
import { GoodreadsCardComponent } from './components/now/goodreads-card/goodreads-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeeMoreLinkComponent } from './components/shared/see-more-link/see-more-link.component';
import { LegoSetsComponent } from './components/collections/lego-sets/lego-sets.component';
import { CheckOrXComponent } from './components/shared/check-or-x/check-or-x.component';
import { BoardGamesComponent } from './components/collections/board-games/board-games.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog/blog-post/blog-post.component';
import { PageTitleComponent } from './components/shared/page-title/page-title.component';
import { NavbarButtonComponent } from './components/shared/navbar-button/navbar-button.component';
import { DateDisplayComponent } from './components/shared/date-display/date-display.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

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
    SerializdCardComponent,
    GoodreadsCardComponent,
    FooterComponent,
    SeeMoreLinkComponent,
    LegoSetsComponent,
    CheckOrXComponent,
    BoardGamesComponent,
    BlogComponent,
    BlogPostComponent,
    PageTitleComponent,
    NavbarButtonComponent,
    DateDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
