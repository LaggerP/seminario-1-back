const Sequelize = require('sequelize');
const userProfile = require('../models').User_profile;

module.exports = {
   createProfile(profileData, res) {
      console.log(profileData)
      return userProfile.create({
         user_id: profileData.user_id,
         dni: profileData.dni,
         birthday: profileData.birthday,
         profile_name: profileData.username,
         firstname: profileData.firstname,
         lastname: profileData.lastname,
         benefits_points: 0
      }).then(profile => {
            res.status(200).json({ data: `${profile.profile_name} was created` })
         })
         .catch(error => res.status(400).send(error))
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
