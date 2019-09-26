var kafka = require('kafka-node');

var kClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
var topics = [{ topic: 'sandbox-topic', partition: 0 }];
// var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

var consumer = new kafka.Consumer(kClient, topics, {});

consumer.on('message', function (message) {
  console.log(message);
});

consumer.on('error', function (err) {
  console.log('error', err);
});

let admin = new kafka.Admin(kClient);
admin.listTopics((err, topics) => {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log(topics);
});



