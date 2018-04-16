const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId/delete', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe('POST', () => {
    it('deletes the item', async () => {
      const itemToDelete = await seedItemToDatabase()

      const response = await request(app)
        .post(`/items/${itemToDelete._id}/delete`)
        .type('form')

      const notFound = await Item.findById(itemToDelete._id)
      assert.isNull(notFound)
    })
  })
})
