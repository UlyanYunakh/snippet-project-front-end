import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SnippetShortService } from 'src/app/services/snippet-short.service';
import { ShortSnippet } from '../../models/ShortSnippet';

@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    providers: [SnippetShortService]
})
export class SnippetsListComponent implements OnInit {
    public shortSnippets: ShortSnippet[] = [];

    public isErrorOccured = false;
    public errorMessage!: string;

    constructor(private service: SnippetShortService) { }

    ngOnInit() {
        this.getShortSnippets();
    }

    public getShortSnippets() {
        this.isErrorOccured = false;

        this.service.getMany(new HttpParams({
            fromObject: {
                page: 0,
                pageSize: 10,
                orderBy: "date",
                orderDirection: 0
            }
        })).subscribe(
            responce => {
                this.shortSnippets = this.shortSnippets.concat(responce);
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
            }
        );
    }
}
