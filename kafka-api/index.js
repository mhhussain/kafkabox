let e = require('express');
let kafka = require('kafka-node');

let app = e();
let kClient = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' });

app.use(e.json());

app.get('/topics', (req, res) => {
    let admin = new kafka.Admin(kClient);
    admin.listTopics((err, topics) => {
        res.json(topics);
    });
});

app.listen(3001, () => {
    console.log('listening on port 3001')
});
