const Sequelize = require('sequelize');
const benefits = require('../models').Benefits
const profileControlller = require('../controllers/UserProfileController');
module.exports = {
   list(_, res) {
      return benefits.findAll({})
         .then(benefits => res.status(200).send(benefits))
         .catch(error => res.status(400).send(error))
   },
   async redeemBenefit(req, res) {
      const { profile_points, id, id_profile } = req.body
      const _benefit = await benefits.findOne({ where: { id: id } });

      if ((profile_points - _benefit.dataValues.necessary_points) < 0) res.status(400).send({ status: 400, msg: "insufficient points"})

      try {

         const dataToUpdate = {
            id_profile: id_profile,
            profile_points: profile_points,
            necessary_points: _benefit.dataValues.necessary_points
         }
         
         const _profile = await profileControlller.updateProfilePoints(dataToUpdate);

         res.status(201).send({ msg: 'benefit redeem success' })

      } catch (e) {
         res.status(400).send(e);
      }
   }

};
