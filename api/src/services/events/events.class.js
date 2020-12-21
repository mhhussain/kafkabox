const { Service } = require('feathers-nedb');

exports.Events = class Events extends Service {
  create(data, params) {
    // TODO: Send event to Kafka based on topic in params
    //  only add event to NeDB is send to Kafka is successful
    return super.create(data, params);
  }
};
