let kafka = require('kafka-node');

let configs = require('../configs');

let setupTopicConsumer = (app, topic) => {
    
    let kClient = new kafka.KafkaClient({ kafkaHost: configs.KAFKA_HOST });
    let payload = [
        {
            topic: topic,
            offset: 0,
            partition: 0
        }
    ];
    var options = {
        autoCommit: false,
        fetchMaxWaitMs: 3000,
        fetchMaxBytes: 1024 * 1024,
        fromOffset: true
    };

    let consumer = new kafka.Consumer(kClient, payload, options);
    consumer.on('message', (message) => {
        app.service('messages').create(message);
    });

    consumer.on('error', (err) => {
        consumer.close();
    });
};

module.exports = {
    setupTopicConsumer
};
