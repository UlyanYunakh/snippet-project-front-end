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
    public form: FormGroup | undefined;
    public langs: Lang[] | undefined;
    public snippet: Snippet | undefined;
    public errorMessage: string | undefined;
    public submittingState = false;

    constructor(
        private langService: LangService,
        private snippetService: SnippetService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.setupForm();
    }
    
    public setupForm() {
        this.route.paramMap.subscribe(
            (params: ParamMap) => {
                this.getLangs();

                if (params.get("snippetId")) {
                    this.setupEditForm(params.get("snippetId")!);
                }
                else {
                    this.setupCleanForm();
                }
            }
        );
    }

    public submit() {
        this.submittingState = true;

        if (this.snippet) {
            this.updateSnippet();
        }
        else {
            this.submitNewSnippet();
        }
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

    private setupEditForm(snippetId: string) {
        this.snippetService.get(snippetId).subscribe(
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
                this.errorMessage = "Не удалось загрузить сниппет.";
            }
        );
    }

    private setupCleanForm() {
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

    private getLangs() {
        this.langService.getMany(new HttpParams({
            fromObject: {
                page: 1,
                pageSize: 100,
                sortOption: "popular"
            }
        })).subscribe(
            responce => {
                this.langs = responce;
            },
            error => {
                this.errorMessage = "Не удалось загрузить языки.";
            }
        );
    }

    private updateSnippet() {
        this.snippet!.languageId = this.form!.get("languageId")?.value;
        this.snippet!.title = this.form!.get("title")?.value;
        this.snippet!.description = this.form!.get("description")?.value;
        this.snippet!.snippet = this.form!.get("snippet")?.value;

        this.snippetService.update(this.snippet!).subscribe(
            responce => {
                // do something with responce
                this.submittingState = false;
            },
            error => {
                this.errorMessage = "Не удалось обновить сниппет.";
                this.submittingState = false;
            }
        );
    }

    private submitNewSnippet() {
        this.snippetService.create(this.form!.getRawValue()).subscribe(
            responce => {
                // do something with responce
                this.submittingState = false;
            },
            error => {
                this.errorMessage = "Не удалось опубликовать сниппет.";
                this.submittingState = false;
            }
        );
    }
}