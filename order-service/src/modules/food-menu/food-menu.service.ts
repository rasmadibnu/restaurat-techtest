import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FoodMenu } from "../../entities/food-menu.entity";

@Injectable()
export class FoodMenuService {
  constructor(
    @InjectRepository(FoodMenu)
    private readonly foodMenuRepository: Repository<FoodMenu>
  ) {}

  async findAll(): Promise<FoodMenu[]> {
    return this.foodMenuRepository.find({
      where: { isAvailable: true },
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number): Promise<FoodMenu> {
    const foodMenu = await this.foodMenuRepository.findOne({
      where: { id, isAvailable: true },
    });

    if (!foodMenu) {
      throw new NotFoundException(`Food menu with ID ${id} not found`);
    }

    return foodMenu;
  }

  async create(createData: Partial<FoodMenu>): Promise<FoodMenu> {
    const foodMenu = this.foodMenuRepository.create(createData);
    return this.foodMenuRepository.save(foodMenu);
  }

  async update(id: number, updateData: Partial<FoodMenu>): Promise<FoodMenu> {
    const foodMenu = await this.findOne(id);
    Object.assign(foodMenu, updateData);
    return this.foodMenuRepository.save(foodMenu);
  }

  async remove(id: number): Promise<void> {
    const foodMenu = await this.findOne(id);
    foodMenu.isAvailable = false;
    await this.foodMenuRepository.save(foodMenu);
  }

  async findByIds(ids: number[]): Promise<FoodMenu[]> {
    return this.foodMenuRepository.findByIds(ids);
  }
}
