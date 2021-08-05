import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Lang } from "../models/Lang";
import { BaseService } from "./base.service";

@Injectable()
export class LangService extends BaseService<Lang> {
    protected path = "lang";

    constructor(http: HttpClient){
        super(http);
    }
}