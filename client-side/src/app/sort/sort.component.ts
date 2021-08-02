import { Component, Input } from '@angular/core';
import { SortLink } from '../models/SortLink';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html'
})
export class SortComponent {
  @Input() links: SortLink[] | undefined;
}
