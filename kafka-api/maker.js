let kafka = require('kafka-node');

var kClient = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' });

let producer = new kafka.Producer(kClient);
producer.on('ready', () => {
    setInterval(send, 1000);
});

let send = () => {
    var message = new Date().toString();
    producer.send([{ topic: 'sandbox-topic', partition: 0, messages: [message], attributes: 1}], (err, result) => {
        if (err != null) {
            //console.log('message sent');
        }
    });
};
