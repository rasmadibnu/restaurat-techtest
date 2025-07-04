"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
const food_menu_entity_1 = require("../entities/food-menu.entity");
const order_entity_1 = require("../entities/order.entity");
let DatabaseConfig = class DatabaseConfig {
    createTypeOrmOptions() {
        return {
            type: "mysql",
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "root",
            database: process.env.DB_DATABASE || "restaurant_db",
            entities: [food_menu_entity_1.FoodMenu, order_entity_1.Order, order_entity_1.OrderItem],
            synchronize: true,
            logging: process.env.NODE_ENV === "development",
        };
    }
};
exports.DatabaseConfig = DatabaseConfig;
exports.DatabaseConfig = DatabaseConfig = __decorate([
    (0, common_1.Injectable)()
], DatabaseConfig);
//# sourceMappingURL=database.config.js.map