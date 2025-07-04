import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./config/database.config";
import { KitchenModule } from "./modules/kitchen/kitchen.module";
import { RabbitmqModule } from "./modules/rabbitmq/rabbitmq.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    KitchenModule,
    RabbitmqModule,
  ],
})
export class AppModule {}
