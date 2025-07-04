import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { FoodMenuService } from "./food-menu.service";
import { FoodMenu } from "../../entities/food-menu.entity";

@Controller("food-menu")
export class FoodMenuController {
  constructor(private readonly foodMenuService: FoodMenuService) {}

  @Get()
  async findAll(): Promise<FoodMenu[]> {
    return this.foodMenuService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<FoodMenu> {
    return this.foodMenuService.findOne(id);
  }

  @Post()
  async create(@Body() createData: Partial<FoodMenu>): Promise<FoodMenu> {
    return this.foodMenuService.create(createData);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateData: Partial<FoodMenu>
  ): Promise<FoodMenu> {
    return this.foodMenuService.update(id, updateData);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.foodMenuService.remove(id);
  }
}
