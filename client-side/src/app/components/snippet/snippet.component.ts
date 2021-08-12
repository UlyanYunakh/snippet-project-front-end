import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ClipboardService } from 'ngx-clipboard';
import { SnippetService } from 'src/app/services/snippet.service';
import { Snippet } from '../../models/Snippet';

@Component({
    selector: 'app-snippet',
    templateUrl: './snippet.component.html',
    providers: [SnippetService]
})
export class SnippetComponent implements OnInit {
    public snippet: Snippet | undefined;
    public snippetId: string | undefined;
    public errorMessage: string | undefined;
    public isOwner: boolean | undefined;

    private isAuthenticated: boolean | undefined;

    constructor(
        private service: SnippetService,
        private route: ActivatedRoute,
        private router: Router,
        private clipboardApi: ClipboardService,
        public auth: AuthService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.snippetId = params.get("snippetId")!;
            this.getSnippet();
            this.getAthentication();
        });
    }

    public getSnippet() {
        this.errorMessage = undefined;

        this.service.get(this.snippetId!).subscribe(
            responce => {
                this.snippet = responce;
            },
            error => {
                this.errorMessage = error;
            }
        );
    }

    public delete() {
        this.service.delete(this.snippetId!).subscribe(
            responce => {
                this.router.navigate(['/profile']);
            }
        );
    }

    public like() {
        this.service.like(this.snippetId!).subscribe(
            responce => {
                if (responce) {
                    this.snippet!.like++;
                }
                else {
                    this.snippet!.like--;
                }
            }
        );
    }

    public copyUrl() {
        this.clipboardApi.copyFromContent(`${location.href}`);
    }

    private getAthentication() {
        this.auth.isAuthenticated$.subscribe(
            result => {
                this.isAuthenticated = result;
                
                if (this.isAuthenticated) {
                    this.service.owner(this.snippetId!).subscribe(
                        responce => {
                            this.isOwner = responce;
                        }
                    );
                }
            }
        );
    }
}
