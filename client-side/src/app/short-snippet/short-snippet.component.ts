import { Component, Inject, Input, OnInit } from '@angular/core';
import { ShortSnippet } from '../models/ShortSnippet';

@Component({
    selector: 'app-short-snippet',
    templateUrl: './short-snippet.component.html',
    styleUrls: ['./short-snippet.component.css']
})
export class ShortSnippetComponent implements OnInit {
    @Input() snippet!: ShortSnippet;

    constructor() { }

    ngOnInit(): void {
    }

}
