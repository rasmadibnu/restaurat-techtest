"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const email_config_1 = require("../../config/email.config");
const fs = require("fs");
const path = require("path");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(email_config_1.EmailConfig.smtp);
    }
    async sendOrderConfirmation(orderEvent) {
        try {
            const htmlTemplate = await this.getBasicTemplate(orderEvent);
            const mailOptions = {
                from: email_config_1.EmailConfig.from,
                to: orderEvent.customerEmail,
                subject: `Order Confirmation - Order #${orderEvent.orderId}`,
                html: htmlTemplate,
            };
            await this.transporter.sendMail(mailOptions);
            console.log(`Order confirmation email sent to ${orderEvent.customerEmail}`);
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
    async getEmailTemplate(orderEvent) {
        try {
            const templatePath = path.join(__dirname, "../../templates/order-confirmation.html");
            let template = fs.readFileSync(templatePath, "utf-8");
            template = template.replace("{{orderId}}", orderEvent.orderId.toString());
            template = template.replace("{{customerEmail}}", orderEvent.customerEmail);
            template = template.replace("{{totalAmount}}", orderEvent.totalAmount.toString());
            template = template.replace("{{orderDate}}", new Date(orderEvent.createdAt).toLocaleDateString());
            const itemsHtml = orderEvent.orderItems
                .map((item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.foodMenu.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `)
                .join("");
            template = template.replace("{{orderItems}}", itemsHtml);
            return template;
        }
        catch (error) {
            console.error("Error reading email template:", error);
            return this.getBasicTemplate(orderEvent);
        }
    }
    getBasicTemplate(orderEvent) {
        const itemsList = orderEvent.orderItems
            .map((item) => `${item.id} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            .join("<br>");
        return `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <h2>Order Confirmation</h2>
          <p>Thank you for your order!</p>
          <p><strong>Order ID:</strong> ${orderEvent.orderId}</p>
          <p><strong>Customer:</strong> ${orderEvent.customerEmail}</p>
          <p><strong>Order Date:</strong> ${new Date(orderEvent.createdAt).toLocaleDateString()}</p>
          <h3>Order Items:</h3>
          <p>${itemsList}</p>
          <p><strong>Total Amount: $${orderEvent.totalAmount}</strong></p>
          <p>Your order is being prepared. You will receive another notification once it's ready.</p>
        </body>
      </html>
    `;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map