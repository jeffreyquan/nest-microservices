import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CLIENT_CONFIG: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'registration-group',
    },
  },
};

export const KAFKA_TOPICS = {
  USER_REGISTRATION_PENDING: 'user.registration.pending',
  USER_REGISTRATION_FULFILLED: 'user.registration.fulfilled',
};
