import { Component, Input } from '@angular/core';
import { ShortSnippet } from '../../models/ShortSnippet';
import { ClipboardService } from 'ngx-clipboard';

@Component({
    selector: 'app-short-snippet',
    templateUrl: './short-snippet.component.html'
})
export class ShortSnippetComponent {
    @Input() snippet!: ShortSnippet;

    private baseURL = location.origin;

    constructor(
        private clipboardApi: ClipboardService
    ) { }

    copyUrl(langName:string, snippetId: number) {
        this.clipboardApi.copyFromContent(`${this.baseURL}/langs/${langName}/${snippetId}`);
    }
}