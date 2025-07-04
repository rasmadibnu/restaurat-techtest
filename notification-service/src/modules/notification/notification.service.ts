import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { OrderEvent } from "../../common/interfaces/order-event.interface";

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  async sendOrderConfirmation(orderEvent: OrderEvent): Promise<void> {
    try {
      await this.emailService.sendOrderConfirmation(orderEvent);
      console.log(
        `Order confirmation processed for order ${orderEvent.orderId}`
      );
    } catch (error) {
      console.error("Error processing order confirmation:", error);
      throw error;
    }
  }
}
