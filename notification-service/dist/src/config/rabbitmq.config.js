"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqConfig = void 0;
exports.RabbitmqConfig = {
    url: process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672',
    exchange: 'order_exchange',
    queues: {
        orderConfirmation: 'order.confirmation',
    },
};
//# sourceMappingURL=rabbitmq.config.js.map