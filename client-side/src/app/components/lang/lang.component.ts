import { Component, Input, OnInit } from '@angular/core';
import { Lang } from '../../models/Lang';

@Component({
    selector: 'app-lang',
    templateUrl: './lang.component.html'
})
export class LangComponent implements OnInit {
    @Input() lang!: Lang;

    constructor() { }

    ngOnInit(): void {
    }

}
