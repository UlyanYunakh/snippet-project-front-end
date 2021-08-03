import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdProviderModule } from './ng-zorro-antd-provider.module';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedComponent } from './components/feed/feed.component';
import { TagsComponent } from './tags/tags.component';
import { LangsComponent } from './langs/langs.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './components/create/create.component';
import { TopLangsComponent } from './top-langs/top-langs.component';
import { TopTagsComponent } from './top-tags/top-tags.component';
import { SnippetsListComponent } from './snippets-list/snippets-list.component';
import { ShortSnippetComponent } from './short-snippet/short-snippet.component';
import { SnippetComponent } from './snippet/snippet.component';
import { LangComponent } from './components/lang/lang.component';
import { SortComponent } from './sort/sort.component';

registerLocaleData(ru);

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FeedComponent,
        TagsComponent,
        LangsComponent,
        SearchComponent,
        ProfileComponent,
        CreateComponent,
        TopLangsComponent,
        TopTagsComponent,
        SnippetsListComponent,
        ShortSnippetComponent,
        SnippetComponent,
        LangComponent,
        SortComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NgZorroAntdProviderModule,
        HighlightModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: ru_RU
        },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: () => import('highlight.js')
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
