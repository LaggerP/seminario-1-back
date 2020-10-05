const Sequelize = require('sequelize');
const userProfile = require('../models').User_profile;

module.exports = {
   create(req, res) {
      return userProfile.create({
         user_id: req.body.user_id,
         profile_name: req.body.username,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
      })
         .then(async profile => {
            res.status(200).send(profile)
         })
         .catch(error => res.status(400).send(error))
   },
   list(_, res) {
      console.log("hola")
      return userProfile.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   }
};
