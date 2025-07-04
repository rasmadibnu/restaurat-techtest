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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../entities/order.entity");
const food_menu_service_1 = require("../food-menu/food-menu.service");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
const order_status_enum_1 = require("../../common/enums/order-status.enum");
let OrderService = class OrderService {
    constructor(orderRepository, foodMenuService, rabbitmqService) {
        this.orderRepository = orderRepository;
        this.foodMenuService = foodMenuService;
        this.rabbitmqService = rabbitmqService;
    }
    async createOrder(createOrderDto) {
        const { customerEmail, items } = createOrderDto;
        const foodMenuIds = items.map((item) => item.foodMenuId);
        const foodMenuItems = await this.foodMenuService.findByIds(foodMenuIds);
        if (foodMenuItems.length !== foodMenuIds.length) {
            throw new common_1.BadRequestException("Some food menu items are not available");
        }
        let totalAmount = 0;
        const orderItems = items.map((item) => {
            const foodMenuItem = foodMenuItems.find((menu) => menu.id === item.foodMenuId);
            if (!foodMenuItem) {
                throw new common_1.BadRequestException(`Food menu item with ID ${item.foodMenuId} not found`);
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
        const order = this.orderRepository.create({
            customerEmail,
            orderItems: orderItems,
            totalAmount,
            status: order_status_enum_1.OrderStatus.PENDING,
        });
        const savedOrder = await this.orderRepository.save(order);
        const orderEvent = {
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
    async getOrder(id) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return this.mapToResponseDto(order);
    }
    async getOrderStatus(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            select: ["id", "status"],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return { id: order.id, status: order.status };
    }
    async updateOrderStatus(id, status) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        order.status = status;
        await this.orderRepository.save(order);
    }
    mapToResponseDto(order) {
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        food_menu_service_1.FoodMenuService,
        rabbitmq_service_1.RabbitmqService])
], OrderService);
//# sourceMappingURL=order.service.js.map