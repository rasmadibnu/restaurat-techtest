import { FoodMenuService } from "./food-menu.service";
import { FoodMenu } from "../../entities/food-menu.entity";
export declare class FoodMenuController {
    private readonly foodMenuService;
    constructor(foodMenuService: FoodMenuService);
    findAll(): Promise<FoodMenu[]>;
    findOne(id: number): Promise<FoodMenu>;
    create(createData: Partial<FoodMenu>): Promise<FoodMenu>;
    update(id: number, updateData: Partial<FoodMenu>): Promise<FoodMenu>;
    remove(id: number): Promise<void>;
}
