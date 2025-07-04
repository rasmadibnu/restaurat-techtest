import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { OrderStatus } from "../../common/enums/order-status.enum";
import { OrderEvent } from "../../common/interfaces/order-event.interface";

@Injectable()
export class KitchenService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async processOrder(orderEvent: OrderEvent): Promise<void> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderEvent.orderId },
      });

      if (!order) {
        console.error(`Order with ID ${orderEvent.orderId} not found`);
        return;
      }

      // Update order status to processed
      order.status = OrderStatus.PROCESSED;
      await this.orderRepository.save(order);

      console.log(`Order ${orderEvent.orderId} has been processed by kitchen`);
    } catch (error) {
      console.error("Error processing order:", error);
    }
  }

  async getPendingOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status: OrderStatus.PENDING },
      order: { createdAt: "ASC" },
    });
  }

  async getProcessedOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status: OrderStatus.PROCESSED },
      order: { updatedAt: "DESC" },
    });
  }

  async completeOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.status !== OrderStatus.PROCESSED) {
      throw new Error("Order must be processed before it can be completed");
    }

    order.status = OrderStatus.COMPLETED;
    return this.orderRepository.save(order);
  }
}
