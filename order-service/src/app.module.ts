import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./config/database.config";
import { FoodMenuModule } from "./modules/food-menu/food-menu.module";
import { OrderModule } from "./modules/order/order.module";
import { RabbitmqModule } from "./modules/rabbitmq/rabbitmq.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    FoodMenuModule,
    OrderModule,
    RabbitmqModule,
  ],
})
export class AppModule {}
