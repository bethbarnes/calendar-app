const router = require('express').Router()
const { Event } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({})
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body)
    res.json(newEvent)
  } catch (err) {
    next(err)
  }
})


//will need to check this once front end is built
router.put ('/:id', async (req, res, next) => {
  try {
    const editedEvent = await Event.findById(req.params.id).update(req.body)
    res.json(editedEvent)
  } catch (err) {
    next(err)
  }
})
