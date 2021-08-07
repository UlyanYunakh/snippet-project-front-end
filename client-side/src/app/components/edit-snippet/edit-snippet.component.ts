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

  constructor(private service: LangService) {
    this.form = new FormGroup({
      "languageId": new FormControl("", Validators.required),
      "title": new FormControl("", Validators.required),
      "description": new FormControl(),
      "snippet": new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.service.getMany(new HttpParams({
      fromObject: {
        page: 1,
        pageSize: 10,
        sortOption: "popular"
      }
    })).subscribe(
      responce => {
        this.langs = responce;
      }
    );
  }

  public submit() {
    console.log(this.form.getRawValue() as Snippet);
  }
}

