// Initializes the `consumers` service on path `/consumers`
const { Consumers } = require('./consumers.class');
const createModel = require('../../models/consumers.model');
const hooks = require('./consumers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/consumers', new Consumers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('consumers');

  service.hooks(hooks);
};
