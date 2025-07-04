import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    getOrder(id: number): Promise<OrderResponseDto>;
    getOrderStatus(id: number): Promise<{
        id: number;
        status: string;
    }>;
}
