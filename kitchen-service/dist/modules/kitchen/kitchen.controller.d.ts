import { KitchenService } from "./kitchen.service";
import { Order } from "../../entities/order.entity";
export declare class KitchenController {
    private readonly kitchenService;
    constructor(kitchenService: KitchenService);
    getPendingOrders(): Promise<Order[]>;
    getProcessedOrders(): Promise<Order[]>;
    completeOrder(id: number): Promise<Order>;
}
