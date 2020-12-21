const { Service } = require('feathers-nedb');

exports.Topics = class Topics extends Service {
  delete(id, params) {
    throw new Error('method not allowed');
  };

  create(data, params) {
    // TODO: Create topic in Kafka
    //  only add topic to NeDB if Kafka topic
    //  create is successful
    return super.create(data, params)
  };
};
