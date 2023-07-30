import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './components/collections/collections.component';
import { HomeComponent } from './components/home/home.component';
import { NowComponent } from './components/now/now.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { LegoSetsComponent } from './components/lego-sets/lego-sets.component';

const routes: Routes = [
  { path: 'lego', component: LegoSetsComponent },
  { path: 'now', component: NowComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'socials', component: SocialLinksComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
