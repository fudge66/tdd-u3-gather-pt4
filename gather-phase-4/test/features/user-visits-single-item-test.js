const {assert} = require('chai')
const {buildItemObject} = require('../test-utils')

describe('User wants to view a single item', () => {
  describe('so they create a new item via the /items/create page', () => {
    it('and view it from path /items/:itemId', () => {
      const itemToCreate = buildItemObject({ description: 'Single item test description' })

      browser.url('/items/create')
      browser.setValue('#title-input', itemToCreate.title)
      browser.setValue('#description-input', itemToCreate.description)
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl)
      browser.click('#submit-button')

      // Now at '/' after being redirected, select the last item
      browser.click('.item-card:last-child a')

      // Check that we routed to /items and can see the new item's description
      assert.include(browser.getUrl(), '/items')
      assert.include(browser.getText('body'), itemToCreate.description)
    })
  })
})
