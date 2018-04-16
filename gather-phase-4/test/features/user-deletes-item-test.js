const {assert} = require('chai')
const {buildItemObject} = require('../test-utils')
const itemToCreate = buildItemObject({ title: 'Item to delete' })

describe('User wants to delete an item', () => {
  describe('They hover over a newly created item and click the Bin icon', () => {
    it('should delete the item', () => {
      // create item
      browser.url('/items/create')
      browser.setValue('#title-input', itemToCreate.title)
      browser.setValue('#description-input', itemToCreate.description)
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl)
      browser.click('#submit-button')

      // test for item existence
      browser.url('/')
      assert.include(browser.getText('body'), itemToCreate.title)

      // delete
      browser.submitForm('.item-card:last-child form.delete-form')
      assert.notInclude(browser.getText('body'), itemToCreate.title)
    })
  })
})
