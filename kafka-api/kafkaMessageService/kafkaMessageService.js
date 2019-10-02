let _ = require('lodash');

class KafkaMessageService {
    constructor() {
        this.messages = [];
        // create new nedb store here
    }

    async find() {
        return this.messages;
        // return entire nedb store here
    }

    // Delete messages for a topic
    // Current use for this is when a consumer offset is forced reset to zero
    async deleteTopicData(topic) {
        this.messages = _.reject(this.messages, (m) => { return m.topic === topic; });
    }

    async create(data) {
        this.messages.push(data);
        return data;
        // insert to nedb here
    }
};

module.exports = KafkaMessageService;
