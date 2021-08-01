import { Lang } from "./Lang";
import { Tag } from "./Tag";
import { User } from "./User";

export interface Snippet {
    id: number;
    title: string;
    description: string;
    snippet: string;
    date: Date;
    languageId: number;
    language: Lang;
    userId: number;
    user: User;
    like: number;
    tags: Tag[];
}