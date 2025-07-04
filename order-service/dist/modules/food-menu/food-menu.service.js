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
exports.FoodMenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const food_menu_entity_1 = require("../../entities/food-menu.entity");
let FoodMenuService = class FoodMenuService {
    constructor(foodMenuRepository) {
        this.foodMenuRepository = foodMenuRepository;
    }
    async findAll() {
        return this.foodMenuRepository.find({
            where: { isAvailable: true },
            order: { createdAt: "DESC" },
        });
    }
    async findOne(id) {
        const foodMenu = await this.foodMenuRepository.findOne({
            where: { id, isAvailable: true },
        });
        if (!foodMenu) {
            throw new common_1.NotFoundException(`Food menu with ID ${id} not found`);
        }
        return foodMenu;
    }
    async create(createData) {
        const foodMenu = this.foodMenuRepository.create(createData);
        return this.foodMenuRepository.save(foodMenu);
    }
    async update(id, updateData) {
        const foodMenu = await this.findOne(id);
        Object.assign(foodMenu, updateData);
        return this.foodMenuRepository.save(foodMenu);
    }
    async remove(id) {
        const foodMenu = await this.findOne(id);
        foodMenu.isAvailable = false;
        await this.foodMenuRepository.save(foodMenu);
    }
    async findByIds(ids) {
        return this.foodMenuRepository.findByIds(ids);
    }
};
exports.FoodMenuService = FoodMenuService;
exports.FoodMenuService = FoodMenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(food_menu_entity_1.FoodMenu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FoodMenuService);
//# sourceMappingURL=food-menu.service.js.map