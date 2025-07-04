import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { NotificationService } from "../notification/notification.service";
export declare class RabbitmqService implements OnModuleInit, OnModuleDestroy {
    private readonly NotificationService;
    private connection;
    private channel;
    constructor(NotificationService: NotificationService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private connect;
    private setupQueue;
    private startConsumer;
    private disconnect;
}
