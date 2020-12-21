// Initializes the `topics` service on path `/topics`
const { Topics } = require('./topics.class');
const createModel = require('../../models/topics.model');
const hooks = require('./topics.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/topics', new Topics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('topics');

  service.hooks(hooks);
};
