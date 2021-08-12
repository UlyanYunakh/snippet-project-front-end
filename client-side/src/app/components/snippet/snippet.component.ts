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
    public isAuthenticated: boolean | undefined;
    public isLiked: boolean | undefined;
    public LikingState = false;

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
        this.LikingState = true;

        this.service.like(this.snippetId!).subscribe(
            responce => {
                console.log(responce);
                if (responce) {
                    this.isLiked = true;
                    this.snippet!.like++;
                    this.LikingState = false;
                }
                else {
                    this.isLiked = false;
                    this.snippet!.like--;
                    this.LikingState = false;
                }
            }
        );
    }

    public copyUrl() {
        this.clipboardApi.copyFromContent(`${location.href}`);
        alert("Ссылка скопирована");
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
                    this.getLike();
                }
            }
        );
    }

    private getLike() {
        this.service.getLike(this.snippetId!).subscribe(
            responce => {
                this.isLiked = responce;
            }
        );
    }
}
