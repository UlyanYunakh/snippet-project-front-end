import { Component, Input, OnInit } from '@angular/core';
import { Snippet } from '../../models/Snippet';

@Component({
    selector: 'app-snippet',
    templateUrl: './snippet.component.html',
    styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {
    public snippet!: Snippet;

    constructor() { }

    ngOnInit(): void {
        this.snippet = {
            id: 1,
            title: "Title",
            description: "Very long long long long long long long long long long long long long long long long long long long long long long descriprion",
            snippet: `internal static bool ValidateJson(string json)
{
    try
    {
        List<DictionaryItem> items = JsonConvert.DeserializeObject<List<DictionaryItem>>(json);
    }
    catch
    {
        return false;
    }
    return true;
}`,
            date: new Date,
            languageId: 1,
            language: {
                id: 1,
                name: "Lang"
            },
            userId: 1,
            user: {
                id: 1,
                username: "Username"
            },
            like: 12,
            tags: [
                {
                    id: 1,
                    name: "#os"
                },
                {
                    id: 2,
                    name: "#windows"
                },
                {
                    id: 3,
                    name: "#algorithm"
                },
                {
                    id: 4,
                    name: "#othertag"
                }
            ]
        };
    }

}
