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
    // allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
},
// {
//   getterMethods: {
//     month() {
//       return this.startTime.substr(0,2)
//     },
    // day(){
    //   return this.startTime.slice(8,10)
    // },
    // year(){
    //   return this.startTime.slice(0,4)
    // }
  // }
// }

)

module.exports = Event
