const httpMocks = require('node-mocks-http');
const SequelizeMock = require('sequelize-mock');

const dataFactory = require('./data');

describe('data route', () => {

  let data;
  let req;
  let res;
  let next;
  let db;

  // this is a little gross, but the alternative is making real http calls to a live server and that is worse
  // in a real app, I would prefer to find a way to expose these handler functions directly for testing
  let route;

  beforeEach(() => {
    db = new SequelizeMock();
    data = dataFactory({db});
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/data/10',
      params: {
        id: 10
      }
    });
    res = httpMocks.createResponse();
    next = jest.fn();
    route = data.stack.filter((f => f.route.path === '/data/:id'))[0];

    // db models mocked here
    const Upload = db.define('Upload', {
      extension: 'txt',
      description: 'affidavit',
      size: 6400,
      md5: 'someMd5HashString'
    }, {});

    const Keyword = db.define('Keyword', {
      keyword: 'signed'
    }, {});

    Upload.associate = function(models) {
      Upload.hasMany(models.Keyword);
    };

    Keyword.associate = function(models) {
      Keyword.belongsTo(models.Upload)
    };
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
      .then((val) => {
        const data = res._getJSONData();
        expect(data.id).toBe(10);
      });
  });

});
