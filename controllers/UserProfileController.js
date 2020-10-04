const Sequelize = require('sequelize');
const userProfile = require('../models').UserProfile;

module.exports = {
   register(req, res) {
      return userProfile
         .create({
               user_id: req.body.user_id,
               username: req.body.username,
               firstname: req.body.firstname,
               lastname: req.body.lastname,
			})
			.then(user => {
				return res.status(200).json(user)
			})
			.catch(error => res.status(400).json({error: error, message: "Profile creation error"}))
   },
   list(_, res) {
      return userProfile.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   }
};
