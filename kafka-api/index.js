let e = require('express');
let kafka = require('kafka-node');

let app = e();
let configs = {
    port: 3001
};

let KAFKA_HOST = '127.0.0.1:9092'
let kClient = new kafka.KafkaClient({ kafkaHost: KAFKA_HOST });

app.use(e.json());

// Get list of topics
app.get('/topics', (req, res) => {
    let admin = new kafka.Admin(kClient);
    admin.listTopics((err, topics) => {
        if (err != null) {
            res.json(err);
            return;
        }
        res.json(topics);
    });
});

// Create new topic with body { topicName }
app.post('/createTopic', (req, res) => {
    let { topicName } = req.body;

    let topics = [{
        topic: topicName,
        partitions: 1,
        replicationFactor: 1
    }];

    let admin = new kafka.Admin(kClient);
    admin.createTopics(topics, (err, adResp) => {
        if (err != null) {
            res.json(err);
            return;
        }
        res.json(adResp);
    });
});

// Send message to topic with body { topic, message }
app.post('/sendMessage', (req, res) => {
    let { message, topic } = req.body;

    if (message == null || topic ==  null) {
        res.json({error: "no message and/or topic"});
        return;
    }

    let pClient = new kafka.KafkaClient({ kafkaHost: KAFKA_HOST });
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

app.listen(configs.port, () => {
    console.log(`listening on port ${configs.port}`);
});
