// Initializes the `clusters` service on path `/clusters`
const { Clusters } = require('./clusters.class');
const createModel = require('../../models/clusters.model');
const hooks = require('./clusters.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/clusters', new Clusters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('clusters');

  service.hooks(hooks);
};
