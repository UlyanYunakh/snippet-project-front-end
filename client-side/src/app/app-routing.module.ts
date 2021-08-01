import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FeedComponent } from './feed/feed.component';
import { LangsComponent } from './langs/langs.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SnippetComponent } from './snippet/snippet.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  { path: 'feed/:id', component: SnippetComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'langs/:id', component: LangsComponent },
  { path: 'langs', component: LangsComponent },
  { path: 'tags/:id', component: TagsComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'create', component: CreateComponent },
  {path: '', redirectTo: '/feed', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
