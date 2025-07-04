import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { OrderEvent } from "../../common/interfaces/order-event.interface";
export declare class KitchenService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    processOrder(orderEvent: OrderEvent): Promise<void>;
    getPendingOrders(): Promise<Order[]>;
    getProcessedOrders(): Promise<Order[]>;
    completeOrder(id: number): Promise<Order>;
}
