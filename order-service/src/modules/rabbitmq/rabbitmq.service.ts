import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import * as amqp from "amqplib";
import { connect, Channel } from "amqplib";
import { RabbitmqConfig } from "../../config/rabbitmq.config";
import { OrderEvent } from "../../common/interfaces/order-event.interface";

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.ChannelModel;
  private channel: Channel;

  async onModuleInit() {
    await this.connect();
    await this.setupExchangeAndQueues();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      this.connection = await connect(RabbitmqConfig.url);
      this.channel = await this.connection.createChannel();
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
      throw error;
    }
  }

  private async setupExchangeAndQueues() {
    try {
      // Create fanout exchange
      await this.channel.assertExchange(RabbitmqConfig.exchange, "fanout", {
        durable: true,
      });

      // Create queues
      await this.channel.assertQueue(RabbitmqConfig.queues.orderConfirmation, {
        durable: true,
      });
      await this.channel.assertQueue(RabbitmqConfig.queues.orderProcess, {
        durable: true,
      });

      // Bind queues to exchange
      await this.channel.bindQueue(
        RabbitmqConfig.queues.orderConfirmation,
        RabbitmqConfig.exchange,
        ""
      );
      await this.channel.bindQueue(
        RabbitmqConfig.queues.orderProcess,
        RabbitmqConfig.exchange,
        ""
      );

      console.log("RabbitMQ exchange and queues setup completed");
    } catch (error) {
      console.error("Failed to setup RabbitMQ exchange and queues:", error);
      throw error;
    }
  }

  async publishOrderEvent(orderEvent: OrderEvent) {
    try {
      const message = Buffer.from(JSON.stringify(orderEvent));
      await this.channel.publish(RabbitmqConfig.exchange, "", message, {
        persistent: true,
      });
      console.log("Order event published:", orderEvent.orderId);
    } catch (error) {
      console.error("Failed to publish order event:", error);
      throw error;
    }
  }

  private async disconnect() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log("Disconnected from RabbitMQ");
    } catch (error) {
      console.error("Error disconnecting from RabbitMQ:", error);
    }
  }
}
