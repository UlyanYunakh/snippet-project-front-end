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
    public loadingState = false;
    public submittingState = false;
    
    private currPage: number | undefined;
    private httpParams: HttpParams | undefined;

    constructor(
        private langService: LangService,
        private snippetService: SnippetShortService
    ) { }

    ngOnInit(): void {
        this.setup();
    }

    public setup() {
        this.shortSnippets = [];

        this.getLangs();
        this.createBasicForm();
    }

    public submit() {
        this.submittingState = true;

        this.shortSnippets = [];
        this.form?.get("page")?.setValue(this.currPage = 1);

        this.httpParams = new HttpParams({ fromObject: this.form?.getRawValue() });
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

    public addTagToArray() {
        (<FormArray>this.form!.controls["tags"]).push(new FormControl("", Validators.required));
    }

    public removeTagFromArray(index: number) {
        (<FormArray>this.form!.controls["tags"]).removeAt(index);
    }

    public getTagsFormsControls(): FormArray {
        return this.form!.controls["tags"] as FormArray;
    }

    public addExcludeTagToArray() {
        (<FormArray>this.form!.controls["tagsExclude"]).push(new FormControl("", Validators.required));
    }

    public removeExcludeTagFromArray(index: number) {
        (<FormArray>this.form!.controls["tagsExclude"]).removeAt(index);
    }

    public getExcludeTagsFormsControls(): FormArray {
        return this.form!.controls["tagsExclude"] as FormArray;
    }

    public addCreationDateToGroup() {
        this.removeFromDateFromGroup();
        this.removeToDateFromGroup();
        this.form?.addControl("creationDate", new FormControl("", Validators.required));
    }

    public removeCreationDateFromGroup() {
        this.form?.removeControl("creationDate");
    }

    public addFromDateToGroup() {
        this.removeCreationDateFromGroup();
        this.form?.addControl("from", new FormControl("", Validators.required));
    }

    public removeFromDateFromGroup() {
        this.form?.removeControl("from");
    }

    public addToDateToGroup() {
        this.removeCreationDateFromGroup();
        this.form?.addControl("to", new FormControl("", Validators.required));
    }

    public removeToDateFromGroup() {
        this.form?.removeControl("to");
    }

    public addMatchStringToGroup() {
        this.form?.addControl("matchString", new FormControl("", Validators.required));
    }

    public removeMatchStringFromGroup() {
        this.form?.removeControl("matchString");
    }

    private createBasicForm() {
        this.form = new FormGroup({
            "langs": new FormArray([]),
            "langsExclude": new FormArray([]),
            "tags": new FormArray([]),
            "tagsExclude": new FormArray([]),
            "page": new FormControl(this.currPage),
            "pageSize": new FormControl(10)
        });
    }

    public getSnippets() {
        this.errorMessage = undefined;
        this.loadingState = true;

        this.snippetService.getMany(this.httpParams!).subscribe(
            responce => {
                this.shortSnippets = this.shortSnippets?.concat(responce);
                this.httpParams = this.httpParams?.set("page", ++this.currPage!);
                this.loadingState = false;
                this.submittingState = false;
            },
            error => {
                this.errorMessage = "Не удалось найти сниппеты, подходящие под критерии поиска."
                this.loadingState = false;
                this.submittingState = false;
            }
        );
    }

    private getLangs() {
        this.langService.getMany(new HttpParams({
            fromObject: {
                page: 1,
                pageSize: 100
            }
        })).subscribe(
            responce => {
                this.langs = responce;
            },
            error => {
                this.errorMessage = error;
            }
        );
    }
}
