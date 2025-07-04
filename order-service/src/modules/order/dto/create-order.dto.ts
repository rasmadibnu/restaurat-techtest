import { IsEmail, IsArray, ValidateNested, IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsNumber()
  @IsPositive()
  foodMenuId: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsEmail()
  customerEmail: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}