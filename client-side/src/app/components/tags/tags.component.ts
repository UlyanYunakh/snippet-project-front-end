import { Component } from '@angular/core';
import { SortLink } from 'src/app/models/SortLink';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html'
})
export class TagsComponent {
    public links: SortLink[] | undefined;

    constructor() {
        this.links = [
            {
                optionLink: "/tags/sort/popular",
                optionName: "Популярные"
            },
            {
                optionLink: "/tags/sort/abc",
                optionName: "По алфавиту"
            }
        ];
    }
}
