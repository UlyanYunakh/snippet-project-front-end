import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShortSnippet } from "../models/ShortSnippet";
import { BaseService } from "./base.service";

@Injectable()
export class SnippetShortService extends BaseService<ShortSnippet> {
    protected path = "snippet-short";
    
    constructor(http: HttpClient) {
        super(http);
    }
    
    protected getManyMap(responce: string) {
        return JSON.parse(responce, (key, value) => {
            if (key === "date") {
                return new Date(value);
            }
            else {
                return value;
            }
        });
    }
}