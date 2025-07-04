"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqService = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
const rabbitmq_config_1 = require("../../config/rabbitmq.config");
let RabbitmqService = class RabbitmqService {
    async onModuleInit() {
        await this.connect();
        await this.setupExchangeAndQueues();
    }
    async onModuleDestroy() {
        await this.disconnect();
    }
    async connect() {
        try {
            this.connection = await (0, amqplib_1.connect)(rabbitmq_config_1.RabbitmqConfig.url);
            this.channel = await this.connection.createChannel();
            console.log("Connected to RabbitMQ");
        }
        catch (error) {
            console.error("Failed to connect to RabbitMQ:", error);
            throw error;
        }
    }
    async setupExchangeAndQueues() {
        try {
            await this.channel.assertExchange(rabbitmq_config_1.RabbitmqConfig.exchange, "fanout", {
                durable: true,
            });
            await this.channel.assertQueue(rabbitmq_config_1.RabbitmqConfig.queues.orderConfirmation, {
                durable: true,
            });
            await this.channel.assertQueue(rabbitmq_config_1.RabbitmqConfig.queues.orderProcess, {
                durable: true,
            });
            await this.channel.bindQueue(rabbitmq_config_1.RabbitmqConfig.queues.orderConfirmation, rabbitmq_config_1.RabbitmqConfig.exchange, "");
            await this.channel.bindQueue(rabbitmq_config_1.RabbitmqConfig.queues.orderProcess, rabbitmq_config_1.RabbitmqConfig.exchange, "");
            console.log("RabbitMQ exchange and queues setup completed");
        }
        catch (error) {
            console.error("Failed to setup RabbitMQ exchange and queues:", error);
            throw error;
        }
    }
    async publishOrderEvent(orderEvent) {
        try {
            const message = Buffer.from(JSON.stringify(orderEvent));
            await this.channel.publish(rabbitmq_config_1.RabbitmqConfig.exchange, "", message, {
                persistent: true,
            });
            console.log("Order event published:", orderEvent.orderId);
        }
        catch (error) {
            console.error("Failed to publish order event:", error);
            throw error;
        }
    }
    async disconnect() {
        var _a, _b;
        try {
            await ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.close());
            await ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.close());
            console.log("Disconnected from RabbitMQ");
        }
        catch (error) {
            console.error("Error disconnecting from RabbitMQ:", error);
        }
    }
};
exports.RabbitmqService = RabbitmqService;
exports.RabbitmqService = RabbitmqService = __decorate([
    (0, common_1.Injectable)()
], RabbitmqService);
//# sourceMappingURL=rabbitmq.service.js.map