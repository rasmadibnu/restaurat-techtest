export const RabbitmqConfig = {
  url: process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672',
  exchange: 'order_exchange',
  queues: {
    orderConfirmation: 'order.confirmation',
  },
};