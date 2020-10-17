const Sequelize = require('sequelize');
const benefits = require ('../models').Benefits
module.exports = {
   list(_, res) {
      return benefits.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   
};
