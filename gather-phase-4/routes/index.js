const router = require('express').Router();
const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const { title, description, imageUrl } = req.body
  const newItem = new Item({ title, description, imageUrl })

  newItem.validateSync()

  if ( newItem.errors ) {
    res.status(400).render( 'create', { newItem: newItem } )
  } else {
    await newItem.save()
    res.redirect( '/' )
  }
});

router.get('/items/:itemId', async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId)
    res.render('single', { item })
  } catch (e) {
    console.error(e)
    res.sendStatus(404)
  }
})

router.post('/items/:itemId/delete', async (req, res, next) => {
  try {
    await Item.findByIdAndRemove(req.params.itemId)
    res.redirect('/')
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = router;
