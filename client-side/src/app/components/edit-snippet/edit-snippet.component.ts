import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Lang } from 'src/app/models/Lang';
import { Snippet } from 'src/app/models/Snippet';
import { LangService } from 'src/app/services/lang.service';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    providers: [LangService, SnippetService]
})
export class EditSnippetComponent implements OnInit {
    public form!: FormGroup;
    public langs!: Lang[];
    public snippet!: Snippet;

    public isReady = false;
    public isErrorOccured = false;
    public errorMessage!: string;

    private snippetId!: string;

    constructor(
        private langService: LangService,
        private snippetService: SnippetService,
        private route: ActivatedRoute
    ) {
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
        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get("snippetId")) {
                this.snippetId = params.get("snippetId")!;
                this.getSnippetToEdit();
            }
            this.getLangs();
        });
    }

    public getSnippetToEdit() {
        this.isErrorOccured = false;

        this.snippetService.get(this.snippetId).subscribe(
            responce => {
                this.snippet = responce;

                this.form = new FormGroup({
                    "languageId": new FormControl(this.snippet.language.id, [
                        Validators.required
                    ]),
                    "title": new FormControl(this.snippet.title, [
                        Validators.required,
                        Validators.maxLength(140)
                    ]),
                    "description": new FormControl(this.snippet.description, [
                        Validators.maxLength(2000)
                    ]),
                    "snippet": new FormControl(this.snippet.snippet, [
                        Validators.required,
                        Validators.maxLength(4000)
                    ])
                });
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
            }
        );
    }

    public getLangs() {
        this.isErrorOccured = false;

        this.langService.getMany(new HttpParams({
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
        this.snippetService.post(this.form.getRawValue()).subscribe(
            responce => {
                console.log(responce);
            },
            error => {
                this.errorMessage = error;
                this.isErrorOccured = true;
                this.isReady = false;
            }
        );
    }

    public onTab(event: any) {
        if (event.key === "Tab") {
            event.preventDefault();

            var textArea = document.querySelector("#snippet") as any;

            var start = textArea.selectionStart;
            var end = textArea.selectionEnd;

            textArea.value = textArea.value.substring(0, start) + "\t" + textArea.value.substring(end);

            textArea.selectionStart = textArea.selectionEnd = start + 1;
        }
    }
}

