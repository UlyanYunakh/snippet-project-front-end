import { Component, OnInit } from '@angular/core';
import { SortOption } from '../models/SortOption';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    public sortOption: SortOption = { fieldName: "date", sortDirection: 0 };

    constructor() { }

    setSortOption(option: SortOption) {
        this.sortOption = option;
    }

    ngOnInit(): void {

    }

}
