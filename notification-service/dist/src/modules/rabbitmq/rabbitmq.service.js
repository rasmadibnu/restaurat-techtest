"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqService = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqplib");
const rabbitmq_config_1 = require("../../config/rabbitmq.config");
const notification_service_1 = require("../notification/notification.service");
let RabbitmqService = class RabbitmqService {
    constructor(NotificationService) {
        this.NotificationService = NotificationService;
    }
    async onModuleInit() {
        await this.connect();
        await this.setupQueue();
        await this.startConsumer();
    }
    async onModuleDestroy() {
        await this.disconnect();
    }
    async connect() {
        try {
            this.connection = await amqp.connect(rabbitmq_config_1.RabbitmqConfig.url);
            this.channel = await this.connection.createChannel();
            console.log("Notification Service connected to RabbitMQ");
        }
        catch (error) {
            console.error("Failed to connect to RabbitMQ:", error);
            throw error;
        }
    }
    async setupQueue() {
        try {
            await this.channel.assertQueue(rabbitmq_config_1.RabbitmqConfig.queues.orderConfirmation, {
                durable: true,
            });
            console.log("Notification Service queue setup completed");
        }
        catch (error) {
            console.error("Failed to setup queue:", error);
            throw error;
        }
    }
    async startConsumer() {
        try {
            await this.channel.prefetch(1);
            await this.channel.consume(rabbitmq_config_1.RabbitmqConfig.queues.orderConfirmation, async (message) => {
                if (message) {
                    try {
                        const orderEvent = JSON.parse(message.content.toString());
                        console.log("Notification Service received order:", orderEvent.orderId);
                        await this.NotificationService.sendOrderConfirmation(orderEvent);
                        this.channel.ack(message);
                    }
                    catch (error) {
                        console.error("Error processing order message:", error);
                        this.channel.reject(message, false);
                    }
                }
            }, { noAck: false });
            console.log("Notification Service is listening for orders to process");
        }
        catch (error) {
            console.error("Failed to start consumer:", error);
            throw error;
        }
    }
    async disconnect() {
        var _a, _b;
        try {
            await ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.close());
            await ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.close());
            console.log("Notification Service disconnected from RabbitMQ");
        }
        catch (error) {
            console.error("Error disconnecting from RabbitMQ:", error);
        }
    }
};
exports.RabbitmqService = RabbitmqService;
exports.RabbitmqService = RabbitmqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => notification_service_1.NotificationService))),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], RabbitmqService);
//# sourceMappingURL=rabbitmq.service.js.map