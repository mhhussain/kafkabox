let kafkajs = require('kafkajs');
let _ = require('lodash');

let configs = require('../configs');

let groups = [];

let setupTopicConsumer = async (app, topic) => {
    let groupId = `${topic}-socket-group`;

    if (_.includes(groups, groupId)) {
        return;
    }

    let kClient = new kafkajs.Kafka(configs.kafkaConfig);
    let consumer = kClient.consumer({ groupId });

    // Delete existing messages in feathers
    app.service('messages').deleteTopicData(topic);

    await consumer.connect();
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

    await consumer.seek({ topic: topic, partition: 0, offset: 0 });

    // Keep track of groups so we dont reconsume...
    groups.push(groupId);
};

module.exports = {
    setupTopicConsumer
};
