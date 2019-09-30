class KafkaMessageService {
    constructor() {
        this.messages = [];
        // create new nedb store here
    }

    async find() {
        return this.messages;
        // return entire nedb store here
    }

    async create(data) {
        this.messages.push(data);
        return data;
        // insert to nedb here
    }
};

module.exports = KafkaMessageService;
