import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortLink } from '../../models/SortLink';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html'
})
export class FeedComponent {
    public links: SortLink[] | undefined;

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
}
