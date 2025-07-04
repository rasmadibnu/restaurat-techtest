import { OrderItem } from "../../entities/order.entity";

export interface OrderEvent {
  orderId: number;
  customerEmail: string;
  orderItems: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}
