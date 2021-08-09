import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lang } from 'src/app/models/Lang';
import { ShortSnippet } from 'src/app/models/ShortSnippet';
import { LangService } from 'src/app/services/lang.service';
import { SnippetShortService } from 'src/app/services/snippet-short.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    providers: [LangService, SnippetShortService]
})
export class SearchComponent implements OnInit {
    public form: FormGroup | undefined;
    public langs: Lang[] | undefined;
    public shortSnippets: ShortSnippet[] | undefined;
    public errorMessage: string | undefined;
    public submittingState = false;

    constructor(
        private langService: LangService,
        private snippetService: SnippetShortService
    ) { }

    ngOnInit(): void {
        this.getLangs();
        this.createBasicForm();
    }

    public submit() {
        this.submittingState = true;
        this.getSnippets();
    }

    public addLangToArray() {
        (<FormArray>this.form!.controls["langs"]).push(new FormControl("", Validators.required));
    }

    public removeLangFromArray(index: number) {
        (<FormArray>this.form!.controls["langs"]).removeAt(index);
    }

    public getLangsFormsControls(): FormArray {
        return this.form!.controls["langs"] as FormArray;
    }

    public addExcludeLangToArray() {
        (<FormArray>this.form!.controls["langsExclude"]).push(new FormControl("", Validators.required));
    }

    public removeExcludeLangFromArray(index: number) {
        (<FormArray>this.form!.controls["langsExclude"]).removeAt(index);
    }

    public getExcludeLangsFormsControls(): FormArray {
        return this.form!.controls["langsExclude"] as FormArray;
    }

    private createBasicForm() {
        this.form = new FormGroup({
            "tags": new FormArray([]),
            "tagsExclude": new FormArray([]),
            "langs": new FormArray([]),
            "langsExclude": new FormArray([]),
            "creationDate": new FormControl(""),
            "from": new FormControl(""),
            "to": new FormControl(""),
            "matchString": new FormControl(""),
            "page": new FormControl(1),
            "pageSize": new FormControl(100)
        });
    }

    private getSnippets() {
        this.snippetService.getMany(this.form?.getRawValue()).subscribe(
            responce => {
                this.shortSnippets = responce;
                this.submittingState = false;
            },
            error => {
                this.errorMessage = "Не удалось найти сниппеты, подходящие под критерии поиска."
                this.submittingState = false;
            }
        );
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
}
