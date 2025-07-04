import { EmailService } from "../email/email.service";
import { OrderEvent } from "../../common/interfaces/order-event.interface";
export declare class NotificationService {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendOrderConfirmation(orderEvent: OrderEvent): Promise<void>;
}
