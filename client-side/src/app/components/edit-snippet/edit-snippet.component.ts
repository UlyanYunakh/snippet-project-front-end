import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lang } from 'src/app/models/Lang';
import { Snippet } from 'src/app/models/Snippet';
import { LangService } from 'src/app/services/lang.service';

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    providers: [LangService]
})
export class EditSnippetComponent implements OnInit {
    public form!: FormGroup;
    public langs!: Lang[];

    public isReady = false;
    public isErrorOccured = false;
    public errorMessage!: string;

    constructor(private service: LangService) {
        this.form = new FormGroup({
            "languageId": new FormControl("", [
                Validators.required
            ]),
            "title": new FormControl("", [
                Validators.required,
                Validators.maxLength(140)
            ]),
            "description": new FormControl("", [
                Validators.maxLength(2000)
            ]),
            "snippet": new FormControl("", [
                Validators.required,
                Validators.maxLength(4000)
            ])
        });
    }

    ngOnInit(): void {
        this.getLangs();
    }

    public getLangs() {
        this.isErrorOccured = false;

        this.service.getMany(new HttpParams({
            fromObject: {
                page: 1,
                pageSize: 100,
                sortOption: "popular"
            }
        })).subscribe(
            responce => {
                this.langs = responce;
                this.isReady = true;
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
                this.isReady = false;
            }
        );
    }

    public submit() {
        console.log(this.form.getRawValue() as Snippet);
    }
}

