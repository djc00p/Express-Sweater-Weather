var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');
pry = require('pryjs');

describe('api', () => {
  beforeAll(() => {
    shel.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  })
});

describe('Test user creation path', () => {
  test('It should respond to post method', () => {
    return request(app).post('/api/v1/users').then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toBe({ "api_key": response.body.api_key })
    })
  })
})

describe('Test the root path', () => {
  test('It should respond to the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  });
});
