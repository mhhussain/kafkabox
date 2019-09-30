let kafka = require('kafka-node');
let n_kafka = require('kafkajs');

let { setupTopicConsumer } = require('./kafkaMessageService/topicSocket');
let configs = require('./configs');

let setupRoutes = (app) => {

    /// ************************************************************************
    /// API V2
    /// ************************************************************************

    // Get list of topics
    app.get('/api/v2/topics', (req, res) => {
        let kClient = new n_kafka.Kafka(configs.kafkaConfig);
        let kAdmin = kClient.admin();

        kAdmin.fetchTopicMetadata()
            .then((topics) => { res.json(topics); });
        
        kAdmin.disconnect();
    });
    
    /// ************************************************************************
    /// Old API - being deprecated
    /// ************************************************************************
    // Get list of topics
    app.get('/topics', (req, res) => {
        let aClient = new kafka.KafkaClient({ kafkaHost: configs.KAFKA_HOST });
        let admin = new kafka.Admin(aClient);
        admin.listTopics((err, topics) => {
            if (err != null) {
                res.json(err);
                return;
            }
            res.json(topics);
        });
    });

    // Create new topic with body { topicName }
    app.post('/:topic/create', (req, res) => {
        let topic = req.params.topic;

        if (!topic) {
            res.json("no topic specified");
            return;
        }

        let topics = [{
            topic: topic,
            partitions: 1,
            replicationFactor: 1
        }];

        let aClient = new kafka.KafkaClient({ kafkaHost: configs.KAFKA_HOST });
        let admin = new kafka.Admin(aClient);
        admin.createTopics(topics, (err, adResp) => {
            if (err != null) {
                res.json(err);
                return;
            }
            setupTopicConsumer(app, topic);
            res.json(adResp);
        });
    });

    // Send { message } from body to :topic
    app.post('/:topic/send', (req, res) => {
        let topic = req.params.topic;
        let { message } = req.body;

        if (message == null || topic ==  null) {
            res.json({error: "no message and/or topic"});
            return;
        }

        let pClient = new kafka.KafkaClient({ kafkaHost: configs.KAFKA_HOST });
        let producer = new kafka.Producer(pClient);
        producer.on('ready', () => {
            producer.send([{ topic: topic, partition: 0, messages: [message], attributes: 1}], (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json("message sent");
                }
            });
        });

        producer.on('error', (err) => {
            console.log(`error: ${err}`);
            res.json(err);
        });
    });

    // Get all messages from :topic
    app.get('/:topic', (req, res) => {
        let topic = req.params.topic;

        if (!topic) {
            res.json("no topic");
            return;
        }

        let cClient = new kafka.KafkaClient({ kafkaHost: configs.KAFKA_HOST });
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
        
        var messageArray = [];
        
        let consumer = new kafka.Consumer(cClient, payload, options);
        consumer.on('message', (message) => {
            messageArray.push(message);
            app.service('messages').create(message);

            if (message.highWaterOffset === message.offset + 1) {
                res.json(messageArray);
                consumer.close();
            }
        });

        consumer.on('error', (err) => {
            res.json(err);
            consumer.close();
        });
    });

    // Get the message at :offset from :topic
    app.get('/:topic/:offset', (req, res) => {
        let topic = req.params.topic;
        let offset = req.params.offset;

        if (!topic || !offset) {
            res.json("no topic and/or offset");
            return;
        }

        let cClient = new kafka.KafkaClient({ kafkaHost: configs.KAFKA_HOST });
        let payload = [
            {
                topic: topic,
                offset: offset,
                partition: 0
            }
        ];
        var options = {
            fromOffset: true
        };
        
        
        let kOffset = new kafka.Offset(cClient);
        kOffset.fetchLatestOffsets([topic], (err, offsets) => {
            if (err) {
                res.json(err);
                return;
            }

            if (offsets[topic]['0'] <= offset) {
                res.json("offsetOutOfRange");
                return;
            }

            let consumer = new kafka.Consumer(cClient, payload, options);
            consumer.on('message', (message) => {
                if (message.offset == offset) {
                    res.json(message);
                    consumer.close(true);
                }
            });

            consumer.on('error', (err) => {
                res.json(err);
                consumer.close(true);
            });
        });
    });
};

module.exports = {
    setupRoutes
};
