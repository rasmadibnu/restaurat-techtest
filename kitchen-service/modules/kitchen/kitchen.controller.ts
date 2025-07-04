import { Controller, Get, Param, Post } from "@nestjs/common";
import { KitchenService } from "./kitchen.service";
import { Order } from "../../entities/order.entity";

@Controller("kitchen")
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get("orders/pending")
  async getPendingOrders(): Promise<Order[]> {
    return this.kitchenService.getPendingOrders();
  }

  @Get("orders/processed")
  async getProcessedOrders(): Promise<Order[]> {
    return this.kitchenService.getProcessedOrders();
  }

  @Post("orders/:id/complete")
  async completeOrder(@Param("id") id: number): Promise<Order> {
    return this.kitchenService.completeOrder(id);
  }
}
