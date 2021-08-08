import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

    public post(model: any) {
        return this.http.post<Snippet>(`${this.url}/${this.path}/create`, model);
    }
}