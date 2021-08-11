import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from "@auth0/auth0-spa-js";
import { Observable } from 'rxjs';
import { ShortSnippet } from 'src/app/models/ShortSnippet';
import { SnippetShortService } from 'src/app/services/snippet-short.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [SnippetShortService]
})
export class ProfileComponent implements OnInit {
    public userInfo: User | null | undefined
    public isAuthenticated: boolean | undefined;
    public loadingState: boolean | undefined;
    public errorMessage: string | undefined;
    public shortSnippets: ShortSnippet[] | undefined;

    private httpParams: HttpParams | undefined;
    private currPage: number | undefined;

    constructor(
        public auth: AuthService,
        private snippetService: SnippetShortService
    ) { }

    ngOnInit(): void {
        this.getAthentication();
    }

    public logout() {
        this.auth.logout();
    }

    public login() {
        this.auth.loginWithPopup();
    }

    public getSnippets() {
        this.errorMessage = undefined;
        this.loadingState = true;

        this.snippetService.getMany(this.httpParams!).subscribe(
            responce => {
                this.shortSnippets = this.shortSnippets?.concat(responce);
                this.httpParams = this.httpParams?.set("page", ++this.currPage!);
                this.loadingState = false;
            },
            error => {
                this.errorMessage = error;
                this.loadingState = false;
            }
        );
    }

    private getAthentication() {
        this.auth.isAuthenticated$.subscribe(
            result => {
                this.isAuthenticated = result;

                if (this.isAuthenticated) {
                    this.getUserInfo().subscribe(
                        profile => {
                            this.userInfo = profile;
                            this.currPage = 1;
                            this.shortSnippets = [];
                            this.httpParams = new HttpParams({
                                fromObject: {
                                    authors: this.userInfo?.nickname!,
                                    page: this.currPage!,
                                    pageSize: 5
                                }
                            });
                            this.getSnippets();
                        }
                    );
                }
            }
        );
    }


    private getUserInfo(): Observable<any> {
        return this.auth.user$;
    }
}
