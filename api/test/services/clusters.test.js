const app = require('../../src/app');

describe('\'clusters\' service', () => {
  it('registered the service', () => {
    const service = app.service('clusters');
    expect(service).toBeTruthy();
  });
});
