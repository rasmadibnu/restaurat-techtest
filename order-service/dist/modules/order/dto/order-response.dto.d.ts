import { OrderItem } from "src/entities/order.entity";
import { OrderStatus } from "../../../common/enums/order-status.enum";
export declare class OrderResponseDto {
    id: number;
    customerEmail: string;
    orderItems: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
