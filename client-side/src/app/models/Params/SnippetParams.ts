import { ParamsBase } from "./ParamsBase";

export class SnippetParams extends ParamsBase {
    public authors: number[] | undefined;
    public authorsExclude: number[] | undefined;

    public tags: number[] | undefined;
    public tagsExclude: number[] | undefined;

    public creationDate: Date | undefined;
    public from: Date | undefined;
    public to: Date | undefined;

    public matchString: string | undefined;
}