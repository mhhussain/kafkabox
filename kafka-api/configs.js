let configs = {
    port: 3001,
    KAFKA_HOST: '127.0.0.1:9092',
    kafkaConfig: {
        clientId: 'kafkabox',
        brokers: ['localhost:9092']
    }
};

module.exports = configs;
