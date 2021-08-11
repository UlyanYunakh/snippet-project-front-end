import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from '../../models/Lang';

@Component({
    selector: 'app-lang-list',
    templateUrl: './lang-list.component.html',
    providers: [LangService]
})
export class LangListComponent implements OnInit {
    public langs: Lang[] | undefined;
    public errorMessage: string | undefined;
    public loadingState = false;

    private currPage = 1;
    private httpParams!: HttpParams;

    constructor(
        private service: LangService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.langs = [];
            this.currPage = 1;
            this.setHttpParams(params);
            this.getLangs();
        });
    }

    public getLangs() {
        this.errorMessage = undefined;
        this.loadingState = true;

        this.service.getMany(this.httpParams).subscribe(
            responce => {
                this.langs = this.langs?.concat(responce);
                this.httpParams = this.httpParams.set("page", ++this.currPage);
                this.loadingState = false;
            },
            error => {
                this.errorMessage = error;
                this.loadingState = false;
            }
        );
    }

    private setHttpParams(params: ParamMap) {
        var paramsObject: { [key: string]: any } = {
            page: this.currPage,
            pageSize: 20
        };

        if (params.get('sortOption')) {
            paramsObject.sortOption = params.get('sortOption');
        }
        else {
            paramsObject.sortOption = "abc";
        }

        this.httpParams = new HttpParams({
            fromObject: paramsObject
        });
    }
}