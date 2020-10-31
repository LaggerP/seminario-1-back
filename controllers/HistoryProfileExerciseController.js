const Sequelize = require('sequelize');
const profileHistory = require('../models').History_profile_exercise;

module.exports = {
   create(req, res) {
      return profileHistory
         .create({
            profile_id: req.body.profile_id,
            exercise_id: req.body.exercise_id,
            last_entry: new Date()
			})
			.then(history => {
				return res.status(200).json({msg: "Nuevo dato de historial creado"})
			})
			.catch(error => res.status(400).json({error: error, message: "Profile creation error"}))
   },
   list(_, res) {
      return profileHistory.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   }
};
