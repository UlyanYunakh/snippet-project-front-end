import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { FeedComponent } from './feed/feed.component';
import { LangsComponent } from './langs/langs.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SnippetComponent } from './snippet/snippet.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
    { path: 'feed/:sortOption', component: FeedComponent },
    { path: 'feed', component: FeedComponent },

    { path: 'langs/:langName/sort/:sortOption', component: FeedComponent },
    { path: 'langs/:langName/:snippetId', component: SnippetComponent },
    { path: 'langs/:langName', component: FeedComponent },
    { path: 'langs', component: LangsComponent },

    { path: 'tags/:tagName/sort/:sortOption', component: FeedComponent },
    { path: 'tags/:tagName', component: FeedComponent },
    { path: 'tags', component: TagsComponent },

    { path: 'search', component: SearchComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'create', component: CreateComponent },
    { path: '', redirectTo: '/feed', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
