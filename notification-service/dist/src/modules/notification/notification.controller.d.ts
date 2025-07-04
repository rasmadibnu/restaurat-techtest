import { NotificationService } from "./notification.service";
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getHealth(): Promise<{
        status: string;
        timestamp: Date;
    }>;
    testEmail(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
}
