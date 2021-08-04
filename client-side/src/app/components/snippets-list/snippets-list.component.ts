import { Component, Input, OnInit } from '@angular/core';
import { ShortSnippet } from '../../models/ShortSnippet';
import { Snippet } from '../../models/Snippet';
import { SortOption } from '../../models/SortOption';

@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    providers: []
})
export class SnippetsListComponent implements OnInit {
    public shortSnippets: ShortSnippet[] | undefined;

    @Input() public sortOption: SortOption = { fieldName: "date", sortDirection: 0 };

    constructor() { }

    ngOnInit() {
        // this.httpService.getSnippet().subscribe(data => this.shortSnippets = data);
        // this.shortSnippets = [
        //     {
        //         id: 1,
        //         title: "Title " + this.sortOption.fieldName,
        //         description: "Very long long long long long long long long long long long long long long long long long long long long long long descriprion",
        //         date: new Date,
        //         languageId: 1,
        //         language: {
        //             id: 1,
        //             name: "Lang"
        //         },
        //         userId: 1,
        //         user: {
        //             id: 1,
        //             username: "Username"
        //         },
        //         like: 12,
        //         tags: [
        //             {
        //                 id: 1,
        //                 name: "#os"
        //             },
        //             {
        //                 id: 2,
        //                 name: "#windows"
        //             },
        //             {
        //                 id: 3,
        //                 name: "#algorithm"
        //             },
        //             {
        //                 id: 4,
        //                 name: "#othertag"
        //             }
        //         ]
        //     },
        //     {
        //         id: 1,
        //         title: "Title",
        //         description: "Description",
        //         date: new Date,
        //         languageId: 1,
        //         language: {
        //             id: 1,
        //             name: "LangLangLangLang"
        //         },
        //         userId: 1,
        //         user: {
        //             id: 1,
        //             username: "Username"
        //         },
        //         like: 12,
        //         tags: [
        //             {
        //                 id: 1,
        //                 name: "tag 1"
        //             },
        //             {
        //                 id: 2,
        //                 name: "tag 2"
        //             },
        //             {
        //                 id: 3,
        //                 name: "tag 3"
        //             },
        //             {
        //                 id: 4,
        //                 name: "tag 4"
        //             }
        //         ]
        //     },
        //     {
        //         id: 1,
        //         title: "Title",
        //         description: "Description",
        //         date: new Date,
        //         languageId: 1,
        //         language: {
        //             id: 1,
        //             name: "Lang"
        //         },
        //         userId: 1,
        //         user: {
        //             id: 1,
        //             username: "Username"
        //         },
        //         like: 12,
        //         tags: [
        //             {
        //                 id: 1,
        //                 name: "tag 1"
        //             },
        //             {
        //                 id: 2,
        //                 name: "tag 2"
        //             },
        //             {
        //                 id: 3,
        //                 name: "tag 3"
        //             },
        //             {
        //                 id: 4,
        //                 name: "tag 4"
        //             }
        //         ]
        //     },
        //     {
        //         id: 1,
        //         title: "Title",
        //         description: "Description",
        //         date: new Date,
        //         languageId: 1,
        //         language: {
        //             id: 1,
        //             name: "Lang"
        //         },
        //         userId: 1,
        //         user: {
        //             id: 1,
        //             username: "Username"
        //         },
        //         like: 12,
        //         tags: [
        //             {
        //                 id: 1,
        //                 name: "tag 1"
        //             },
        //             {
        //                 id: 2,
        //                 name: "tag 2"
        //             },
        //             {
        //                 id: 3,
        //                 name: "tag 3"
        //             },
        //             {
        //                 id: 4,
        //                 name: "tag 4"
        //             }
        //         ]
        //     },
        //     {
        //         id: 1,
        //         title: "Title",
        //         description: "Description",
        //         date: new Date,
        //         languageId: 1,
        //         language: {
        //             id: 1,
        //             name: "Lang"
        //         },
        //         userId: 1,
        //         user: {
        //             id: 1,
        //             username: "Username"
        //         },
        //         like: 12,
        //         tags: [
        //             {
        //                 id: 1,
        //                 name: "tag 1"
        //             },
        //             {
        //                 id: 2,
        //                 name: "tag 2"
        //             },
        //             {
        //                 id: 3,
        //                 name: "tag 3"
        //             },
        //             {
        //                 id: 4,
        //                 name: "tag 4"
        //             }
        //         ]
        //     }
        // ];
    }
}
