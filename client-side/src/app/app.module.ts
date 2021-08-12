import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from "@auth0/auth0-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedComponent } from './components/feed/feed.component';
import { TagsComponent } from './components/tags/tags.component';
import { LangsComponent } from './components/langs/langs.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TopLangsComponent } from './components/top-langs/top-langs.component';
import { TopTagsComponent } from './components/top-tags/top-tags.component';
import { SnippetsListComponent } from './components/snippets-list/snippets-list.component';
import { ShortSnippetComponent } from './components/short-snippet/short-snippet.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { LangComponent } from './components/lang/lang.component';
import { SortComponent } from './components/sort/sort.component';
import { LangListComponent } from './components/lang-list/lang-list.component';
import { FeedLangComponent } from './components/feed-lang/feed-lang.component';
import { FeedTagsComponent } from './components/feed-tags/feed-tags.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { EditSnippetComponent } from './components/edit-snippet/edit-snippet.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FeedComponent,
        TagsComponent,
        LangsComponent,
        SearchComponent,
        ProfileComponent,
        TopLangsComponent,
        TopTagsComponent,
        SnippetsListComponent,
        ShortSnippetComponent,
        SnippetComponent,
        LangComponent,
        SortComponent,
        LangListComponent,
        FeedLangComponent,
        FeedTagsComponent,
        TagsListComponent,
        EditSnippetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HighlightModule,
        ReactiveFormsModule,
        ClipboardModule,
        AuthModule.forRoot({
            ...environment.authConfig,
            httpInterceptor:
            {
                allowedList: [
                    `${environment.authConfig.audience}snippet/create`,
                    `${environment.authConfig.audience}snippet/update`,
                    `${environment.authConfig.audience}is-owner/*`,
                    `${environment.authConfig.audience}snippet/delete/*`,
                    `${environment.authConfig.audience}like-snippet/*`
                ]
            }
        })
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: () => import('highlight.js')
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
