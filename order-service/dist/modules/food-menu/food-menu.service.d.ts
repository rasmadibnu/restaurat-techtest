import { Repository } from "typeorm";
import { FoodMenu } from "../../entities/food-menu.entity";
export declare class FoodMenuService {
    private readonly foodMenuRepository;
    constructor(foodMenuRepository: Repository<FoodMenu>);
    findAll(): Promise<FoodMenu[]>;
    findOne(id: number): Promise<FoodMenu>;
    create(createData: Partial<FoodMenu>): Promise<FoodMenu>;
    update(id: number, updateData: Partial<FoodMenu>): Promise<FoodMenu>;
    remove(id: number): Promise<void>;
    findByIds(ids: number[]): Promise<FoodMenu[]>;
}
