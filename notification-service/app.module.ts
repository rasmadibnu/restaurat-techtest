import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotificationModule } from "./src/modules/notification/notification.module";
import { EmailModule } from "./src/modules/email/email.module";
import { RabbitmqModule } from "./src/modules/rabbitmq/rabbitmq.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
    EmailModule,
    RabbitmqModule,
  ],
})
export class AppModule {}
