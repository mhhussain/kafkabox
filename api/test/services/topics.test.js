const app = require('../../src/app');

describe('\'topics\' service', () => {
  it('registered the service', () => {
    const service = app.service('topics');
    expect(service).toBeTruthy();
  });
});
