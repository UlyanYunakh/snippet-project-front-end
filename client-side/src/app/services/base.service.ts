import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ParamsBase } from "../models/Params/ParamsBase";

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

    public getMany(params: HttpParams): Observable<T[]> {
        return this.http.get(`${this.url}/${this.path}/many`, { responseType: "text", params: params }).pipe(
            map(responce => this.getManyMap(responce)),
            retry(3),
            catchError(this.HandleError)
        );
    }

    protected getManyMap(responce: string) {
        return JSON.parse(responce);
    }

    protected HandleError(error: HttpErrorResponse) {
        return throwError("Ошибка! Попробуйте повторить попытку позже.");
    }
}