import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { Lang } from "../models/Lang";
import { BaseService } from "./base.service";

@Injectable()
export class LangService extends BaseService<Lang> {
    protected path = "lang";

    constructor(http: HttpClient) {
        super(http);
    }

    public getByName(name: string): Observable<Lang> {
        return this.http.get(`${this.url}/${this.path}/by-name/${name}`, { responseType: "text" }).pipe(
            map(responce => this.getMap(responce)),
            retry(3),
            catchError(this.HandleError)
        );
    }
}