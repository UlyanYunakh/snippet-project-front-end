import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tag } from 'src/app/models/Tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
    selector: 'app-tags-list',
    templateUrl: './tags-list.component.html',
    providers: [TagService]
})
export class TagsListComponent implements OnInit {
    public tags!: Tag[];

    public isReady = false;
    public isErrorOccured = false;
    public errorMessage = "";

    private currPage!: number;

    private httpParams!: HttpParams;

    constructor(
        private service: TagService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.tags = [];
            this.currPage = 1;
            this.setHttpParams(params);
            this.getTags();
        });
    }

    private setHttpParams(params: ParamMap) {
        var paramsObject: { [key: string]: any } = {
            page: this.currPage,
            pageSize: 30
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

    public getTags() {
        this.isErrorOccured = false;

        this.service.getMany(this.httpParams).subscribe(
            responce => {
                this.tags = this.tags.concat(responce);
                this.httpParams = this.httpParams.set("page", ++this.currPage);
                this.isReady = true;
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
                this.isReady = false;
            }
        );
    }
}
