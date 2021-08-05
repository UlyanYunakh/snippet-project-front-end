import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { FeedLangComponent } from './components/feed-lang/feed-lang.component';
import { FeedTagsComponent } from './components/feed-tags/feed-tags.component';
import { FeedComponent } from './components/feed/feed.component';
import { LangsComponent } from './components/langs/langs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
    { path: 'feed/:sortOption', component: FeedComponent },

    { path: 'langs/:langName/sort/:sortOption', component: FeedLangComponent },
    { path: 'langs/sort/:sortOption', component: LangsComponent },
    { path: 'langs/:langName/:snippetId', component: SnippetComponent },
    { path: 'langs/:langName', component: FeedLangComponent },
    { path: 'langs', component: LangsComponent },

    { path: 'tags/:tagName/sort/:sortOption', component: FeedTagsComponent },
    { path: 'tags/sort/:sortOption', component: TagsComponent },
    { path: 'tags/:tagName', component: FeedTagsComponent },
    { path: 'tags', component: TagsComponent },

    { path: 'search', component: SearchComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'create', component: CreateComponent },
    { path: '', redirectTo: '/feed/new', pathMatch: 'full' },
    { path: '**', redirectTo: '/feed/new', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
