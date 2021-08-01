import { Component, OnInit } from '@angular/core';
import { Lang } from '../models/Lang';

@Component({
    selector: 'app-langs',
    templateUrl: './langs.component.html',
    styleUrls: ['./langs.component.css']
})
export class LangsComponent implements OnInit {
    public langs: Lang[] = [];

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
