import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { KitchenService } from "../kitchen/kitchen.service";
export declare class RabbitmqService implements OnModuleInit, OnModuleDestroy {
    private readonly kitchenService;
    private connection;
    private channel;
    constructor(kitchenService: KitchenService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private connect;
    private setupQueue;
    private startConsumer;
    private disconnect;
}
