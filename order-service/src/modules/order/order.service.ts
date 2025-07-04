import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
import { FoodMenuService } from "../food-menu/food-menu.service";
import { RabbitmqService } from "../rabbitmq/rabbitmq.service";
import { OrderStatus } from "../../common/enums/order-status.enum";
import { OrderEvent } from "../../common/interfaces/order-event.interface";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly foodMenuService: FoodMenuService,
    private readonly rabbitmqService: RabbitmqService
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { customerEmail, items } = createOrderDto;

    // Validate and fetch food menu items
    const foodMenuIds = items.map((item) => item.foodMenuId);
    const foodMenuItems = await this.foodMenuService.findByIds(foodMenuIds);

    if (foodMenuItems.length !== foodMenuIds.length) {
      throw new BadRequestException("Some food menu items are not available");
    }

    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItems = items.map((item) => {
      const foodMenuItem = foodMenuItems.find(
        (menu) => menu.id === item.foodMenuId
      );
      if (!foodMenuItem) {
        throw new BadRequestException(
          `Food menu item with ID ${item.foodMenuId} not found`
        );
      }

      const itemTotal = foodMenuItem.price * item.quantity;
      totalAmount += itemTotal;

      return {
        food_menu_id: foodMenuItem.id,
        name: foodMenuItem.name,
        price: foodMenuItem.price,
        quantity: item.quantity,
      };
    });

    // Create order
    const order = this.orderRepository.create({
      customerEmail,
      orderItems: orderItems,
      totalAmount,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Publish order event to RabbitMQ
    const orderEvent: OrderEvent = {
      orderId: savedOrder.id,
      customerEmail: savedOrder.customerEmail,
      orderItems: savedOrder.orderItems,
      totalAmount: savedOrder.totalAmount,
      status: savedOrder.status,
      createdAt: savedOrder.createdAt,
    };

    await this.rabbitmqService.publishOrderEvent(orderEvent);

    return this.mapToResponseDto(savedOrder);
  }

  async getOrder(id: number): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.mapToResponseDto(order);
  }

  async getOrderStatus(id: number): Promise<{ id: number; status: string }> {
    const order = await this.orderRepository.findOne({
      where: { id },
      select: ["id", "status"],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return { id: order.id, status: order.status };
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = status;
    await this.orderRepository.save(order);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    return {
      id: order.id,
      customerEmail: order.customerEmail,
      orderItems: order.orderItems,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
