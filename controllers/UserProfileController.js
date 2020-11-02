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
      } catch (e) {
         res.status(400).send(e)
      }
   },
   async getAllProfilesByUser(id) {
      return userProfile.findAll({ where: { user_id: id } })
         .then((profile) => {
            let _profiles = [];
            profile.map(data => _profiles.push(data.dataValues));
            return _profiles
         })
         .catch(error => res.status(400).send(error))
   },
   async getProfileById(req, res) {
      console.log(req.params.id)
      return userProfile.findOne({ where: { id: req.params.id } })
         .then((profile) => {
            res.status(200).send(profile)
         })
         .catch(error => res.status(400).send(error))
   },
   updateProfilePoints(dataToUpdate, res) {
      const { profile_points, necessary_points, id_profile } = dataToUpdate
      if (profile_points - necessary_points < 0) return res.status(409).send({ status: 'benefit update error', msg: "insufficient points" })
      return userProfile.update({ benefits_points: profile_points - necessary_points }, { where: { id: id_profile } })
         .then(async profilePointUpdated => profilePointUpdated)
         .catch(error => res.status(400).send(error))
   },
   async updateDataProfile(data, res) {
      const { profile_name, firstname, lastname, dni, birthday, id } = data;

      return userProfile.update({
         profile_name: profile_name,
         firstname: firstname,
         lastname: lastname,
         dni: dni,
         birthday: birthday,
      }, { where: { id: id } })
         .then(updatedProfile => updatedProfile)
         .catch(error => res.status(400).send(error))
   },
   async updateBenefitsPoints (profileId) {
      return await userProfile.increment({
         benefits_points: 30
      },{where: {id: profileId}})
      .then(updatedProfile => updatedProfile)
      .catch(error => res.status(400).send(error))
   }

};
