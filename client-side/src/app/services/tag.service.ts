import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tag } from "../models/Tag";
import { BaseService } from "./base.service";

@Injectable()
export class TagService extends BaseService<Tag> {
    protected path = "tag";

    constructor(http: HttpClient){
        super(http);
    }
}