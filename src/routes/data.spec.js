const httpMocks = require('node-mocks-http');

const dataFactory = require('./data');

describe('data route', () => {

  let data;
  let req;
  let res;
  let next;

  // this is a little gross, but the alternative is making real http calls to a live server and that is worse
  // in a real app, I would prefer to find a way to expose these handler functions directly for testing
  let route;

  beforeEach(() => {
    data = dataFactory({});
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/data/0'
    });
    res = httpMocks.createResponse();
    next = jest.fn();
    route = data.stack.filter((f => f.route.path === '/data/:id'))[0];
  });

  test('should exist', () => {
    expect(route).toBeDefined();
  });

  test('should return 200', () => {
    const handler = route.route.stack[0];

    return handler.handle(req, res, next)
    .then(() => {
        expect(res.statusCode).toBe(200);
    });
  });

  test('should return an upload record', () => {
    const handler = route.route.stack[0];

    return handler.handle(req, res, next)
      .then(() => {
        const data = res._getJSONData();
        expect(data.id).toBeDefined();
      });
  });

});
