"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const food_menu_entity_1 = require("../../entities/food-menu.entity");
const food_menu_controller_1 = require("./food-menu.controller");
const food_menu_service_1 = require("./food-menu.service");
let FoodMenuModule = class FoodMenuModule {
};
exports.FoodMenuModule = FoodMenuModule;
exports.FoodMenuModule = FoodMenuModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([food_menu_entity_1.FoodMenu])],
        controllers: [food_menu_controller_1.FoodMenuController],
        providers: [food_menu_service_1.FoodMenuService],
        exports: [food_menu_service_1.FoodMenuService],
    })
], FoodMenuModule);
//# sourceMappingURL=food-menu.module.js.map