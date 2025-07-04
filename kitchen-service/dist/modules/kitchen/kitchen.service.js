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
exports.KitchenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../entities/order.entity");
const order_status_enum_1 = require("../../common/enums/order-status.enum");
let KitchenService = class KitchenService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async processOrder(orderEvent) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: orderEvent.orderId },
            });
            if (!order) {
                console.error(`Order with ID ${orderEvent.orderId} not found`);
                return;
            }
            order.status = order_status_enum_1.OrderStatus.PROCESSED;
            await this.orderRepository.save(order);
            console.log(`Order ${orderEvent.orderId} has been processed by kitchen`);
        }
        catch (error) {
            console.error("Error processing order:", error);
        }
    }
    async getPendingOrders() {
        return this.orderRepository.find({
            where: { status: order_status_enum_1.OrderStatus.PENDING },
            order: { createdAt: "ASC" },
        });
    }
    async getProcessedOrders() {
        return this.orderRepository.find({
            where: { status: order_status_enum_1.OrderStatus.PROCESSED },
            order: { updatedAt: "DESC" },
        });
    }
    async completeOrder(id) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.status !== order_status_enum_1.OrderStatus.PROCESSED) {
            throw new Error("Order must be processed before it can be completed");
        }
        order.status = order_status_enum_1.OrderStatus.COMPLETED;
        return this.orderRepository.save(order);
    }
};
exports.KitchenService = KitchenService;
exports.KitchenService = KitchenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], KitchenService);
//# sourceMappingURL=kitchen.service.js.map