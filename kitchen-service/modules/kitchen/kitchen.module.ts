import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../../entities/order.entity";
import { KitchenController } from "./kitchen.controller";
import { KitchenService } from "./kitchen.service";
import { RabbitmqModule } from "../rabbitmq/rabbitmq.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => RabbitmqModule),
  ],
  controllers: [KitchenController],
  providers: [KitchenService],
  exports: [KitchenService], // ✅ THIS IS CRUCIAL
})
export class KitchenModule {}
