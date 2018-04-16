const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders empty input fields', async () => {
      try {
        const response = await request(app)
          .get('/items/create');
  
        assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
        assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
        assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      } catch (e) {
        console.error(e + e.stack)
      }
    });
  });

  describe('POST', () => {
    it('creates a new item and tests that it was created successfully', async () => {
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);

      const createdItem = await Item.findOne( itemToCreate )

      assert.isOk( createdItem, 'Item was not created successfully in the database' )
    });

    it( 'redirects to / after item creation', async () => {
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);

      assert.equal( response.status, 302 )
      assert.equal( response.headers.location, '/' )
    })

    it( 'With an invalid item, returns an error and doesnt save', async () => {
      const invalidItemToCreate = { description: 'test', imageUrl: 'https://image.com' }
      const response = await request( app )
        .post('/items/create')
        .type('form')
        .send( invalidItemToCreate )

        const items = await Item.find({})
            console.log( items )
        assert.equal( items.length, 0 )
        assert.equal( response.status, 400 )
        assert.include( parseTextFromHTML( response.text, 'form' ), 'required' )
    })
  });

});
