const Sequelize = require('sequelize');
const benefits = require ('../models').Benefits
module.exports = {
   list(_, res) {
      return benefits.findAll({})
         .then(benefits => res.status(200).send(benefits))
         .catch(error => res.status(400).send(error))
   }
   
};
