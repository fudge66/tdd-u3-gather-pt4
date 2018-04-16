const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe( '#title', () => {
    it( 'is a String', () => {
      const isNumber = 1
      const item = new Item( { title: isNumber } )

      assert.strictEqual( item.title, isNumber.toString() )
    })

    it( 'is required', () => {
      const noTitle = new Item( { title: '' } )

      noTitle.validateSync()

      assert.equal( noTitle.errors.title.message, 'Path `title` is required.' )
    }) 
  })
});
