import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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

    constructor(
        private service: SnippetService,
        private route: ActivatedRoute,
        private clipboardApi: ClipboardService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.snippetId = params.get("snippetId")!;
            this.getSnippet();
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

    copyUrl() {
        this.clipboardApi.copyFromContent(`${location.href}`);
    }
}
