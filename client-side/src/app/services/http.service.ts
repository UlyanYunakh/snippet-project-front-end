import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShortSnippet } from "../models/ShortSnippet";
import { Snippet } from "../models/Snippet";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    getSnippet(): Observable<ShortSnippet[]> {
        return this.http.get("http://localhost:5000/snippet-short/many", { responseType: "text" }).pipe(
            map(responce => {
                return JSON.parse(responce, (key, value) => {
                    if (key === "date") {
                        return new Date(value);
                    }
                    else {
                        return value;
                    }
                })
            })
        );
    }

    getSnippets(): Observable<ShortSnippet[]> {
        return this.http.get("http://localhost:5000/snippet-short/many").pipe(
            map((responce: any) => {
                return responce.map((snippet: any) => {
                    snippet.date = new Date(snippet.date);
                    return snippet;
                });
            })
        );
    }
}