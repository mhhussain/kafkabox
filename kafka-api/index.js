let e = require('express');
let kafka = require('kafka-node');

let app = e();
let kClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

app.use(e.json());

app.get('/topics', (req, res) => {
    let admin = new kafka.Admin(kClient);
    admin.listTopics((err, res) => {
        res.json(res);
    });
});

app.listen(3001, () => {
    console.log('listening on port 3001')
});
