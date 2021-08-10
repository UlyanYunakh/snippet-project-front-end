import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SnippetShortService } from 'src/app/services/snippet-short.service';
import { ShortSnippet } from '../../models/ShortSnippet';

@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    providers: [SnippetShortService]
})
export class SnippetsListComponent implements OnInit {
    public shortSnippets: ShortSnippet[] | undefined;
    public errorMessage: string | undefined;
    public loadingState = false;

    private currPage = 1;
    private httpParams!: HttpParams;

    constructor(
        private service: SnippetShortService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.shortSnippets = [];
            this.currPage = 1;
            this.setHttpParams(params);
            this.getShortSnippets();
        });
    }
    
    public getShortSnippets() {
        this.errorMessage = undefined;
        this.loadingState = true;

        this.service.getMany(this.httpParams).subscribe(
            responce => {
                this.shortSnippets = this.shortSnippets?.concat(responce);
                this.httpParams = this.httpParams.set("page", ++this.currPage);
                this.loadingState = false;
            },
            error => {
                this.errorMessage = "Сниппеты закончились :(";
                this.loadingState = false;
            }
        );
    }

    private setHttpParams(params: ParamMap) {
        var paramsObject: { [key: string]: any } = {
            page: this.currPage,
            pageSize: 10
        };

        if (params.get('sortOption')) {
            paramsObject.sortOption = params.get('sortOption');
        }
        if (params.get('langName')) {
            paramsObject.langs = [params.get('langName')];
        }
        if (params.get('tagName')) {
            paramsObject.tags = [params.get('tagName')];
        }

        this.httpParams = new HttpParams({
            fromObject: paramsObject
        });
    }
}
