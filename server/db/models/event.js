const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}
)

module.exports = Event
