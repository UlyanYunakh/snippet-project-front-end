import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/Tag';

@Component({
    selector: 'app-top-tags',
    templateUrl: './top-tags.component.html',
    styleUrls: ['./top-tags.component.css']
})
export class TopTagsComponent implements OnInit {
    public tags!: Tag[];

    constructor() { }

    ngOnInit(): void {
        this.tags = [
            {
                id: 1,
                name: "tag 1"
            },
            {
                id: 2,
                name: "tag 2"
            },
            {
                id: 3,
                name: "tag 3"
            },
            {
                id: 4,
                name: "tag 4"
            }
        ];
    }
}
