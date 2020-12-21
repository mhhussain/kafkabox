const app = require('../../src/app');

describe('\'consumers\' service', () => {
  it('registered the service', () => {
    const service = app.service('consumers');
    expect(service).toBeTruthy();
  });
});
