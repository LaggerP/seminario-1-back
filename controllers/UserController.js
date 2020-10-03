const Sequelize = require('sequelize');
const user = require('../models').User;
const role = require ('../models').Role
module.exports = {
   create(req, res) {
      return user
         .create({
            username: req.params.username,
            status: req.params.status
         })
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   list(_, res) {
      return user.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   async findAllData(req, res) {
      return user.findAll({})
         .then(user => {
            const data = role.findALl({id: 1})
            console.log(data)
            res.status(200).send(user)
         })
         .catch(error => res.status(400).send(error))
   },
   findAllDataByUser(req, res) {
      return user.findAll({
         include: [{
            model: User,
            as: 'usuario'
       },{
            model: Role,
            as: 'juego'
       }]
      })
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
};
