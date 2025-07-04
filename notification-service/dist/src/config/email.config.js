"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfig = void 0;
exports.EmailConfig = {
    smtp: {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER || "your-email@gmail.com",
            pass: process.env.SMTP_PASS || "your-app-password",
        },
    },
    from: process.env.EMAIL_FROM || "Restaurant <noreply@restaurant.com>",
};
//# sourceMappingURL=email.config.js.map