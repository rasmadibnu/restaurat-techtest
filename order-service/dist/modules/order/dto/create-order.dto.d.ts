declare class OrderItemDto {
    foodMenuId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    customerEmail: string;
    items: OrderItemDto[];
}
export {};
