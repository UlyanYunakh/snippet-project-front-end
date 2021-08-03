import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShortSnippet } from "./models/ShortSnippet";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    getSnippet(): Observable<ShortSnippet[]> {
        return this.http.get("http://localhost:5000/snippet-short/many").pipe(
            map((responce: any) => {
                return responce.map((snippet: ShortSnippet) => {
                    snippet.date = new Date(snippet.date);
                    return snippet;
                });
            })
        );
    }
}