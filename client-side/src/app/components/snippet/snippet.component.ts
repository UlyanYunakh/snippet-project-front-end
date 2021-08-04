import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SnippetService } from 'src/app/services/snippet.service';
import { Snippet } from '../../models/Snippet';

@Component({
    selector: 'app-snippet',
    templateUrl: './snippet.component.html',
    styleUrls: ['./snippet.component.css'],
    providers: [SnippetService]
})
export class SnippetComponent implements OnInit {
    public snippet!: Snippet;
    public snippetId!: string;

    public isErrorOccured = false;
    public errorMessage = "";

    constructor(
        private service: SnippetService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.snippetId = params.get("snippetId")!;
            this.getSnippet(this.snippetId);
        });
    }

    public getSnippet(id: string) {
        this.isErrorOccured = false;

        this.service.get(id).subscribe(
            responce => {
                this.snippet = responce;
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
            }
        );
    }

}
