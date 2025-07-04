import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(":id")
  async getOrder(@Param("id") id: number): Promise<OrderResponseDto> {
    return this.orderService.getOrder(id);
  }

  @Get(":id/status")
  async getOrderStatus(
    @Param("id") id: number
  ): Promise<{ id: number; status: string }> {
    return this.orderService.getOrderStatus(id);
  }
}
