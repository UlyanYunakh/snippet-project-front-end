import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from '../../models/Tag';

@Component({
    selector: 'app-top-tags',
    templateUrl: './top-tags.component.html',
    providers: [TagService]
})
export class TopTagsComponent implements OnInit {
    public tags: Tag[] | undefined;
    public errorMessage: string | undefined;

    constructor(
        private service: TagService
    ) { }

    ngOnInit(): void {
        this.getTopTags();
    }

    public getTopTags() {
        this.errorMessage = undefined;

        this.service.getMany(new HttpParams({
            fromObject: {
                page: 1,
                pageSize: 5,
                sortOption: "popular"
            }
        })).subscribe(
            responce => {
                this.tags = responce;
            },
            error => {
                this.errorMessage = error;
            }
        );
    }
}
