import { OrderDirection } from "../Enums/OrderDirection";

export class ParamsBase {
    public page: number = 0;
    public pageSize: number = 20;
    
    public orderBy: string = "date";
    public orderDirection: OrderDirection = 1;
}