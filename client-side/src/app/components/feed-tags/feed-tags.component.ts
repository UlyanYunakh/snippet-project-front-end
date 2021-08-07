import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SortLink } from 'src/app/models/SortLink';

@Component({
    selector: 'app-feed-tags',
    templateUrl: './feed-tags.component.html'
})
export class FeedTagsComponent implements OnInit {
    public links: SortLink[] | undefined;
    public tagName: string | undefined;

    public isErrorOccured = false;
    public errorMessage!: string;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.tagName = params.get('tagName') ?? '';

            this.createLinks(this.tagName);
        });
    }

    private createLinks(tagName: string) {
        this.links = [
            {
                optionLink: `/tags/${tagName}/sort/new`,
                optionName: "Новые"
            },
            {
                optionLink: `/tags/${tagName}/sort/popular`,
                optionName: "Популярные"
            }
        ];
    }
}
