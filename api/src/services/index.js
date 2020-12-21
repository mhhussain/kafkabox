const clusters = require('./clusters/clusters.service.js');
const topics = require('./topics/topics.service.js');
const events = require('./events/events.service.js');
const consumers = require('./consumers/consumers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(clusters);
  app.configure(topics);
  app.configure(events);
  app.configure(consumers);
};
