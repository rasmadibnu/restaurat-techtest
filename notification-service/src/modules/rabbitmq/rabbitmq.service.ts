import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  forwardRef,
} from "@nestjs/common";
import * as amqp from "amqplib";
import { RabbitmqConfig } from "../../config/rabbitmq.config";
import { OrderEvent } from "../../common/interfaces/order-event.interface";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.ChannelModel;
  private channel: amqp.Channel;

  constructor(
    @Inject(forwardRef(() => NotificationService)) // 👈 inject using forwardRef
    private readonly NotificationService: NotificationService
  ) {}

  async onModuleInit() {
    await this.connect();
    await this.setupQueue();
    await this.startConsumer();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      this.connection = await amqp.connect(RabbitmqConfig.url);
      this.channel = await this.connection.createChannel();
      console.log("Notification Service connected to RabbitMQ");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
      throw error;
    }
  }

  private async setupQueue() {
    try {
      // Assert queue exists
      await this.channel.assertQueue(RabbitmqConfig.queues.orderConfirmation, {
        durable: true,
      });
      console.log("Notification Service queue setup completed");
    } catch (error) {
      console.error("Failed to setup queue:", error);
      throw error;
    }
  }

  private async startConsumer() {
    try {
      // Set prefetch to 1 to ensure fair distribution
      await this.channel.prefetch(1);

      // Start consuming messages
      await this.channel.consume(
        RabbitmqConfig.queues.orderConfirmation,
        async (message) => {
          if (message) {
            try {
              const orderEvent: OrderEvent = JSON.parse(
                message.content.toString()
              );
              console.log(
                "Notification Service received order:",
                orderEvent.orderId
              );

              // Process the order
              await this.NotificationService.sendOrderConfirmation(orderEvent);

              // Acknowledge the message
              this.channel.ack(message);
            } catch (error) {
              console.error("Error processing order message:", error);
              // Reject the message and don't requeue
              this.channel.reject(message, false);
            }
          }
        },
        { noAck: false }
      );

      console.log("Notification Service is listening for orders to process");
    } catch (error) {
      console.error("Failed to start consumer:", error);
      throw error;
    }
  }

  private async disconnect() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log("Notification Service disconnected from RabbitMQ");
    } catch (error) {
      console.error("Error disconnecting from RabbitMQ:", error);
    }
  }
}
