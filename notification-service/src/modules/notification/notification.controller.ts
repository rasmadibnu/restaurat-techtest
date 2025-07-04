import { Controller, Get, Post, Body } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get("health")
  async getHealth(): Promise<{ status: string; timestamp: Date }> {
    return {
      status: "OK",
      timestamp: new Date(),
    };
  }

  @Post("test-email")
  async testEmail(
    @Body() body: { email: string }
  ): Promise<{ message: string }> {
    // Test endpoint for email functionality
    const testOrder = {
      orderId: 999,
      customerEmail: body.email,
      orderItems: [
        {
          id: 1,
          order_id: 999,
          food_menu_id: 1,
          foodMenu: {
            id: 1,
            name: "Test pizza",
            price: 15.99,
            description: "A delicious test pizza",
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          price: 15.99,
          quantity: 1,
          created_at: new Date(),
          order: null, // or provide a mock order object if required
        },
        {
          id: 2,
          order_id: 999,
          food_menu_id: 2,
          foodMenu: {
            id: 2,
            name: "Test pizza",
            price: 12.99,
            description: "A delicious test pizza",
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          price: 12.99,
          quantity: 2,
          created_at: new Date(),
          order: null, // or provide a mock order object if required
        },
      ],
      totalAmount: 41.97,
      status: "pending",
      createdAt: new Date(),
    };

    await this.notificationService.sendOrderConfirmation(testOrder);
    return { message: "Test email sent successfully" };
  }
}
