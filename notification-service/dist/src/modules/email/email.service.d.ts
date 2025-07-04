import { OrderEvent } from "../../common/interfaces/order-event.interface";
export declare class EmailService {
    private transporter;
    constructor();
    sendOrderConfirmation(orderEvent: OrderEvent): Promise<void>;
    private getEmailTemplate;
    private getBasicTemplate;
}
