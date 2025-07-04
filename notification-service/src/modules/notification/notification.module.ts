import { forwardRef, Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { EmailModule } from "../email/email.module";
import { RabbitmqModule } from "../rabbitmq/rabbitmq.module";

@Module({
  imports: [EmailModule, forwardRef(() => RabbitmqModule)],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService], // ✅ THIS IS CRUCIAL
})
export class NotificationModule {}
