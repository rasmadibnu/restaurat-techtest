import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
import { FoodMenuService } from "../food-menu/food-menu.service";
import { RabbitmqService } from "../rabbitmq/rabbitmq.service";
import { OrderStatus } from "../../common/enums/order-status.enum";
export declare class OrderService {
    private readonly orderRepository;
    private readonly foodMenuService;
    private readonly rabbitmqService;
    constructor(orderRepository: Repository<Order>, foodMenuService: FoodMenuService, rabbitmqService: RabbitmqService);
    createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    getOrder(id: number): Promise<OrderResponseDto>;
    getOrderStatus(id: number): Promise<{
        id: number;
        status: string;
    }>;
    updateOrderStatus(id: number, status: OrderStatus): Promise<void>;
    private mapToResponseDto;
}
