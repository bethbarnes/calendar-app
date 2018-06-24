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

router.get('/:month/:date/:year', async (req, res, next) => {
  try {
    const eventsThisDate = await Event.findAll({where:{
      month: req.params.month,
        date: req.params.date,
        year: req.params.year
      }})
    res.json(eventsThisDate)
  } catch (err) {
    next(err)
  }
})

router.get('/:month', async (req, res, next) => {
  try {
    const eventsThisMonth = await Event.findAll({where:{
      month: req.params.month,
      }})
    res.json(eventsThisMonth)
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

router.put('/:id', async (req, res, next) => {
  try {
    const eventToUpdate = await Event.findById(req.params.id)
    eventToUpdate.update(req.body)
    res.json(eventToUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted  = await Event.destroy({ where: { id: req.params.id} })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
