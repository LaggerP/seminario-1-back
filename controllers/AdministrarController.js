const Sequelize = require('sequelize');
const user = require('../models').User;
const userProfile = require('../models').User_profile;
const medicoResponsable = require('../models').Medico_responsable;

const profileController = require('../controllers/UserProfileController')

module.exports = {
   async listByMedicId(req, res) {
      console.log(req.body.id)
      let allPacientesData = [];
      let i = 0;
      try {
         const _medicoResponsable = await medicoResponsable.findAll({ where: { medico_id: req.params.id } });
         for (i; i < _medicoResponsable.length; i++) {
            const userData = await user.findOne({ where: { id: _medicoResponsable[i].dataValues.responsable_id } })
            const { id, username, email, firstname, lastname } = userData.dataValues;
            await profileController.getAllProfilesByUser(id).then(profile => {
               let dataUser = {
                  id: id,
                  username: username,
                  email: email,
                  firstname: firstname,
                  lastname: lastname,
                  profiles: profile
               }
               allPacientesData.push(dataUser)
            })
         }
         res.status(201).send(allPacientesData)
      } catch (e) {
         res.status(400).send(e)
      }

   },
   async updatePatient(req, res) {
      const _updatedProfile = await profileController.updateDataProfile(req.body);
      _updatedProfile[0] === 1 ?
         res.status(201).send({ msg: 'profile patient was updated', status: 201 })
         :
         res.status(400).send({ msg: 'update profile patient error', status: 400 })
   }

};
