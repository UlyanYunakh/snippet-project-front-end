import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Lang } from 'src/app/models/Lang';
import { SortLink } from 'src/app/models/SortLink';
import { LangService } from 'src/app/services/lang.service';

@Component({
    selector: 'app-feed-lang',
    templateUrl: './feed-lang.component.html',
    providers: [LangService]
})
export class FeedLangComponent implements OnInit {
    public links: SortLink[] | undefined;
    public lang: Lang | undefined;

    public isErrorOccured = false;
    public errorMessage!: string;

    constructor(
        private route: ActivatedRoute,
        private service: LangService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            var langName = params.get('langName') ?? '';

            this.createLinks(langName);
            this.getLang(langName);
        });
    }

    private createLinks(langName: string) {
        this.links = [
            {
                optionLink: `/langs/${langName}/sort/new`,
                optionName: "Новые"
            },
            {
                optionLink: `/langs/${langName}/sort/popular`,
                optionName: "Популярные"
            }
        ];
    }

    public getLang(langName: string) {
        this.isErrorOccured = false;

        this.service.getByName(langName).subscribe(
            responce => {
                this.lang = responce;
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
            }
        );
    }
}
