const Sequelize = require('sequelize');
const userProfile = require('../models').User_profile;

module.exports = {
   async createProfile(req, res) {
      try {
         return await userProfile.create({
            user_id: req.user_id,
            dni: req.dni,
            birthday: req.birthday,
            profile_name: req.profile_name,
            firstname: req.firstname,
            lastname: req.lastname,
            benefits_points: 0
         });
         console.log(profileCollection)
         //res.status(201).json({ data: `${profileCollection.dataValues.profile_name} was created` })
      } catch (e) {
         res.status(400).send(e)
      }
   },
   list(_, res) {
      return userProfile.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   updateProfilePoints (req, res) {
      return userProfile.update({benefits_points: req.body.points},{ where: { profile_name: req.body.profile_name } })
      .then(async newPoints => {
         console.log(newPoints);
         res.status(200).send("Profile Points was updated");
      })
      .catch(error => res.status(400).send(error))
   }
};
