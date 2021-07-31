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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedComponent } from './feed/feed.component';
import { TagsComponent } from './tags/tags.component';
import { LangsComponent } from './langs/langs.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';

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
        CreateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NgZorroAntdProviderModule
    ],
    providers: [{ provide: NZ_I18N, useValue: ru_RU }],
    bootstrap: [AppComponent]
})
export class AppModule { }
