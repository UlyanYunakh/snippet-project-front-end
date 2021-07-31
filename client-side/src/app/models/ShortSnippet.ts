import { Lang } from "./Lang";
import { Tag } from "./Tag";
import { User } from "./User";

export interface ShortSnippet {
    id: number;
    title: string;
    description: string;
    date: Date;
    languageId: number;
    language: Lang;
    userId: number;
    user: User;
    like: number;
    tags: Tag[];
}