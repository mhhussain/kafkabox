let e = require('@feathersjs/express');
let feathers = require('@feathersjs/feathers');
let socketio = require('@feathersjs/socketio');

let { setupTopicConsumer } = require('./kafkaMessageService/topicSocket');
let { setupRoutes } = require('./routes');
let kafkaMessageService = require('./kafkaMessageService/kafkaMessageService');
let configs = require('./configs');

let app = e(feathers());

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(e.static(__dirname));

app.configure(e.rest());
app.configure(socketio());

app.use('/messages', new kafkaMessageService());
app.use(e.errorHandler());

app.on('connection', connection => {
    app.channel('everybody').join(connection)
});

app.publish(data => app.channel('everybody'));

// Setup all routes
setupRoutes(app);

app.listen(configs.port, () => {
    console.log(`listening on port ${configs.port}`);
});
