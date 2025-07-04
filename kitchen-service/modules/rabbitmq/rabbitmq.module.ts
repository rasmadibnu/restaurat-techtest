import { forwardRef, Module } from "@nestjs/common";
import { RabbitmqService } from "./rabbitmq.service";
import { KitchenModule } from "modules/kitchen/kitchen.module";

@Module({
  imports: [forwardRef(() => KitchenModule)], // 👈 fix here
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
