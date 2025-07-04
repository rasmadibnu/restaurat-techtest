import { OrderStatus } from "../common/enums/order-status.enum";
export declare class Order {
    id: number;
    customerEmail: string;
    orderItems: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OrderItem {
    id: number;
    order_id: number;
    food_menu_id: number;
    quantity: number;
    price: number;
    created_at: Date;
    order: Order;
}
