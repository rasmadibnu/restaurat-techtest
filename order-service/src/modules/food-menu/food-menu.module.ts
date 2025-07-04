import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodMenu } from "../../entities/food-menu.entity";
import { FoodMenuController } from "./food-menu.controller";
import { FoodMenuService } from "./food-menu.service";

@Module({
  imports: [TypeOrmModule.forFeature([FoodMenu])],
  controllers: [FoodMenuController],
  providers: [FoodMenuService],
  exports: [FoodMenuService],
})
export class FoodMenuModule {}
