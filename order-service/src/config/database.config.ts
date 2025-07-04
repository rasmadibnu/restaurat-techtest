import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { FoodMenu } from "../entities/food-menu.entity";
import { Order, OrderItem } from "../entities/order.entity";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "restaurant_db",
      entities: [FoodMenu, Order, OrderItem],
      synchronize: true,
      logging: process.env.NODE_ENV === "development",
    };
  }
}
