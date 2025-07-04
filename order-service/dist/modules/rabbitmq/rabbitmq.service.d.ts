import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { OrderEvent } from "../../common/interfaces/order-event.interface";
export declare class RabbitmqService implements OnModuleInit, OnModuleDestroy {
    private connection;
    private channel;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private connect;
    private setupExchangeAndQueues;
    publishOrderEvent(orderEvent: OrderEvent): Promise<void>;
    private disconnect;
}
