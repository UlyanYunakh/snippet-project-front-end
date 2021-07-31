import { Component, OnInit } from '@angular/core';
import { Lang } from '../models/Lang';

@Component({
    selector: 'app-top-snippets',
    templateUrl: './top-snippets.component.html',
    styleUrls: ['./top-snippets.component.css']
})
export class TopSnippetsComponent implements OnInit {
    public langs!: Lang[];

    constructor() { }

    ngOnInit(): void {
        this.langs = [
            {
                id: 1,
                name: "lang 1"
            },
            {
                id: 2,
                name: "lang 2"
            },
            {
                id: 3,
                name: "lang 3"
            },
            {
                id: 4,
                name: "lang 4"
            }
        ];
    }

}

