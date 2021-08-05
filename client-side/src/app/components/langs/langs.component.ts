import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortLink } from 'src/app/models/SortLink';

@Component({
    selector: 'app-langs',
    templateUrl: './langs.component.html'
})
export class LangsComponent {
    public links: SortLink[] | undefined;

    constructor(private route: ActivatedRoute) {
        this.links = [
            {
                optionLink: "/langs/sort/popular",
                optionName: "Популарные"
            },
            {
                optionLink: "/langs/sort/abc",
                optionName: "По алфавиту"
            }
        ];
    }
}
