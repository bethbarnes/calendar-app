const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  day: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 31 }
  },
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 12 }
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.TEXT,
  }
})

module.exports = Event
