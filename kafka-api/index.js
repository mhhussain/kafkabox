let e = require('express');
let kafka = require('kafka-node');

let app = e();
let kClient = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' });

app.use(e.json());

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

app.listen(3001, () => {
    console.log('listening on port 3001')
});
