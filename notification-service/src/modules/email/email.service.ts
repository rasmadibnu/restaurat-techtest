import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { EmailConfig } from "../../config/email.config";
import { OrderEvent } from "../../common/interfaces/order-event.interface";
import * as fs from "fs";
import * as path from "path";
import { OrderItem } from "src/entities/order.entity";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(EmailConfig.smtp);
  }

  async sendOrderConfirmation(orderEvent: OrderEvent): Promise<void> {
    try {
      const htmlTemplate = await this.getBasicTemplate(orderEvent);

      const mailOptions = {
        from: EmailConfig.from,
        to: orderEvent.customerEmail,
        subject: `Order Confirmation - Order #${orderEvent.orderId}`,
        html: htmlTemplate,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(
        `Order confirmation email sent to ${orderEvent.customerEmail}`
      );
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  private async getEmailTemplate(orderEvent: OrderEvent): Promise<string> {
    try {
      const templatePath = path.join(
        __dirname,
        "../../templates/order-confirmation.html"
      );
      let template = fs.readFileSync(templatePath, "utf-8");

      // Replace placeholders with actual data
      template = template.replace("{{orderId}}", orderEvent.orderId.toString());
      template = template.replace(
        "{{customerEmail}}",
        orderEvent.customerEmail
      );
      template = template.replace(
        "{{totalAmount}}",
        orderEvent.totalAmount.toString()
      );
      template = template.replace(
        "{{orderDate}}",
        new Date(orderEvent.createdAt).toLocaleDateString()
      );

      // Generate items HTML
      const itemsHtml = orderEvent.orderItems
        .map(
          (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.foodMenu.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
        )
        .join("");

      template = template.replace("{{orderItems}}", itemsHtml);

      return template;
    } catch (error) {
      console.error("Error reading email template:", error);
      // Return a basic template as fallback
      return this.getBasicTemplate(orderEvent);
    }
  }

  private getBasicTemplate(orderEvent: OrderEvent): string {
    const itemsList = orderEvent.orderItems
      .map(
        (item) =>
          `${item.id} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      )
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
}
