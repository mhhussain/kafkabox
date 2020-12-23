const { Service } = require('feathers-nedb');
const kafkajs = require('kafkajs');

exports.Topics = class Topics extends Service {
  setup(app) {
    this.app = app;
  }

  delete(id, params) {
    throw new Error('method not allowed');
  };

  create(data, params) {
    // TODO: Create topic in Kafka
    //  only add topic to NeDB if Kafka topic
    //  create is successful
    return super.create(data, params)
  };

  async find(params) {
    const { clusterId } = params.query;

    if (!clusterId) {
      throw new Error('No cluster specified');
    }

    const cluster = await this.app.service('clusters').get(clusterId);
    const kafkaClient = new kafkajs.Kafka({
      clientId: cluster.clientId,
      brokers: cluster.brokers,
    });
    const kafkaAdmin = kafkaClient.admin();

    const topics = await kafkaAdmin.fetchTopicMetadata();

    kafkaAdmin.disconnect();

    return topics;
  }
};
