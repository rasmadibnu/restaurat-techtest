import { forwardRef, Module } from "@nestjs/common";
import { RabbitmqService } from "./rabbitmq.service";
import { NotificationModule } from "../notification/notification.module";

@Module({
  imports: [forwardRef(() => NotificationModule)], // 👈 fix here
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
