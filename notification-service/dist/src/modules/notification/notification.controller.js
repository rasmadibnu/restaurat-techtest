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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getHealth() {
        return {
            status: "OK",
            timestamp: new Date(),
        };
    }
    async testEmail(body) {
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
                    order: null,
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
                    order: null,
                },
            ],
            totalAmount: 41.97,
            status: "pending",
            createdAt: new Date(),
        };
        await this.notificationService.sendOrderConfirmation(testOrder);
        return { message: "Test email sent successfully" };
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)("health"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Post)("test-email"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "testEmail", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)("notifications"),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map