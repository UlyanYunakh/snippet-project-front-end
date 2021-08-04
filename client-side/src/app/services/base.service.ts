import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";

export class BaseService<T> {
    protected url = environment.urlApi;
    protected path = "anyPath";

    constructor(private http: HttpClient) { }

    public get(id: string): Observable<T> {
        return this.http.get(`${this.url}/${this.path}/${id}`, { responseType: "text" }).pipe(
            map(responce => this.getMap(responce)),
            retry(3),
            catchError(this.HandleError)
        );
    }

    protected getMap(responce: string) {
        return JSON.parse(responce);
    }

    protected HandleError(error: HttpErrorResponse) {
        return throwError("Ошибка! Попробуйте повторить попытку позже.");
    }
}