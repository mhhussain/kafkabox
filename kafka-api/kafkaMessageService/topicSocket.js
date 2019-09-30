let kafkajs = require('kafkajs');

let configs = require('../configs');

let setupTopicConsumer = async (app, topic) => {
    let groupId = `${topic}-socket-group`;
    
    let kClient = new kafkajs.Kafka(configs.kafkaConfig);

    // Reset offsets
    let kAdmin = kClient.admin();
    await kAdmin.resetOffsets({ groupId, topic });

    let consumer = kClient.consumer({ groupId });

    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    
    await consumer.run({
        eachMessage: ({topic, partition, message }) => {
            let m = {
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString()
            }
            app.service('messages').create(m);
        }
    });
};

module.exports = {
    setupTopicConsumer
};
