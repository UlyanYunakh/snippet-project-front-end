import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Snippet } from "../models/Snippet";

@Injectable()
export class SnippetService {
    private url = environment.urlApi + "snippet/";

    constructor(private http: HttpClient) { }

    public get(id: string): Observable<Snippet> {
        return this.http.get(this.url + id, { responseType: "text" }).pipe(
            map(responce => {
                return JSON.parse(responce, (key, value) => {
                    if (key === "date") {
                        return new Date(value);
                    }
                    else {
                        return value;
                    }
                });
            })
        );
    }
}