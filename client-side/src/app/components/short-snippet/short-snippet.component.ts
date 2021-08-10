import { Component, Input } from '@angular/core';
import { ShortSnippet } from '../../models/ShortSnippet';

@Component({
    selector: 'app-short-snippet',
    templateUrl: './short-snippet.component.html'
})
export class ShortSnippetComponent {
    @Input() snippet!: ShortSnippet;
}