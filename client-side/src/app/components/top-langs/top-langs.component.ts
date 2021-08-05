import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from '../../models/Lang';

@Component({
    selector: 'app-top-langs',
    templateUrl: './top-langs.component.html',
    providers: [LangService]
})
export class TopLangsComponent implements OnInit {
    public langs!: Lang[];

    public isErrorOccured = false;
    public errorMessage = "";

    constructor(
        private service: LangService
    ) { }

    ngOnInit(): void {
        this.getTopLangs();
    }

    public getTopLangs() {
        this.isErrorOccured = false;

        this.service.getMany(new HttpParams({
            fromObject: {
                page: 1,
                pageSize: 5,
                sortOption: "new"
            }
        })).subscribe(
            responce => {
                this.langs = responce;
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
            }
        );
    }

}

