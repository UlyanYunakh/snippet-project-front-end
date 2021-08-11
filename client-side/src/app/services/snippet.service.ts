import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Snippet } from "../models/Snippet";
import { BaseService } from "./base.service";

@Injectable()
export class SnippetService extends BaseService<Snippet> {
    protected path = "snippet";

    constructor(http: HttpClient) {
        super(http);
    }

    protected getMap(responce: string) {
        return JSON.parse(responce, (key, value) => {
            if (key === "date") {
                return new Date(value);
            }
            else {
                return value;
            }
        });
    }

    public create(snippet: any) {
        return this.http.post<Snippet>(`${this.url}/${this.path}/create`, snippet).pipe(
            catchError(this.HandleError)
        );
    }

    public update(snippet: Snippet) {
        return this.http.put<Snippet>(`${this.url}/${this.path}/update`, snippet).pipe(
            catchError(this.HandleError)
        );
    }
}
