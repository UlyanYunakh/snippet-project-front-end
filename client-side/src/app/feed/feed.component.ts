import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SortLink } from '../models/SortLink';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    public links: SortLink[] | undefined;

    public sortOption!: string;
    public langName = "";
    public tagName = "";


    constructor(private route: ActivatedRoute) {
        this.links = [
            {
                optionLink: "/feed/new",
                optionName: "Сначала новые"
            },
            {
                optionLink: "/feed/popular",
                optionName: "Сначала популарные"
            }
        ];
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.sortOption = params.get('sortOption') ?? '';
            this.langName = params.get('langName') ?? '';
            this.tagName = params.get('tagName') ?? '';
        });
    }

}
