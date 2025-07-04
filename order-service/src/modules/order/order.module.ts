import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../../entities/order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { FoodMenuModule } from "../food-menu/food-menu.module";
import { RabbitmqModule } from "../rabbitmq/rabbitmq.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), FoodMenuModule, RabbitmqModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
