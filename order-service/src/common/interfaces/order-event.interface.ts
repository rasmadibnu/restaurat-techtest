import { OrderItem } from "src/entities/order.entity";

export interface OrderEvent {
  orderId: number;
  customerEmail: string;
  orderItems: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}
