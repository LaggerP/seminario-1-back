const { assign } = require('nodemailer/lib/shared');
const Sequelize = require('sequelize');
const user = require('../models').User;
const userProfile = require('../models').User_profile;
const medicoResponsable = require('../models').Medico_responsable;
const exerciseCounter = require('../models').Exercise_counter;
const exerciseReading = require('../models').Exercise_reading;
const turnos = require('../models').Turno;

const exerciseCountingProfile = require('../models').Exercise_counter_profile;
const exerciseReadingProfile = require('../models').Exercise_reading_profile;

const profileController = require('../controllers/UserProfileController')

const MEDIC_ROLE  = require('../config/config').MEDIC_ROLE;
const PATIENT_ROLE  = require('../config/config').PATIENT_ROLE;

module.exports = {
   async listByMedicId(req, res) {
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
   },

   async assignTurn(req, res) {
      return turnos
         .create({
            fecha: req.body.fecha,
            hora: req.body.hora,
            comentarios: req.body.comentarios,
            user_id: req.body.user_id,
            profile_id: req.body.profile_id
         })
         .then(assignedTurn => res.status(201).send({status: 201}))
         .catch(error => res.status(400).send(error))
   },

   async assignExercises(req, res) {
      const { selectedOption, profile_id } = req.body;
      selectedOption.map(async (option) => {
         const _response = await exerciseCountingProfile.findOne({ where: { exercise_id: option.value, profile_id: profile_id } })
         if (option.module === 'Contador') {
            try {
               const created = await exerciseCountingProfile.create({
                  exercise_id: option.value,
                  profile_id: profile_id
               })
            } catch {
               res.status(400).send({ msg: 'error with assignExercises', status: 400 })
            }

         } else if (option.module === 'Lectura') {
            try {
               const created = await exerciseReadingProfile.create({
                  exercise_id: option.value,
                  profile_id: profile_id
               })
            } catch {
               res.status(400).send({ msg: 'error with assignExercises', status: 400 })
            }
         } else {
            res.status(400).send({ msg: 'error with assignExercises, all exist!', status: 400 })
         }
      })
      res.status(201).send({ msg: 'all exercises was assigned', status: 201 })
   },

   async getAllExercises(_, res) {
      const counterModule = await exerciseCounter.findAll({});
      const readingModule = await exerciseReading.findAll({});
      let exercises = {
         modules: [
            {
               moduleName: "Contador",
               exercises: counterModule
            },
            {
               moduleName: "Lectura",
               exercises: readingModule,
            }
         ]
      }
      res.status(200).send(exercises)
   },

   async deleteProfile(req, res) {
      try {
         await userProfile.destroy({ where: { id: req.params.id } });
         await exerciseCountingProfile.destroy({ where: { profile_id: req.params.id } })
         await exerciseReadingProfile.destroy({ where: { profile_id: req.params.id } })
         await turnos.destroy({ where: { profile_id: req.params.id } })
         res.status(201).send({ msg: "perfil borrado con exito" })
      } catch (error) {
         res.status(500).send({ msg: "Error al borrar perfil" })
      }
   },

    async deleteResponsable(req, res) {
        try {
           const profiles = await profileController.getAllProfilesByUser(req.params.id);

           for (const profile of profiles) {
              await userProfile.destroy({ where: { id: profile.id } });
              await exerciseCountingProfile.destroy({ where: { profile_id: profile.id } })
              await exerciseReadingProfile.destroy({ where: { profile_id: profile.id } })
              await turnos.destroy({ where: { profile_id: profile.id } })
           };

           await medicoResponsable.destroy({ where: { responsable_id: req.params.id } });
           await user.destroy({ where: { id: req.params.id } });

           res.status(201).send({ msg: "responsable borrado con exito" })
        } catch (error) {
           res.status(500).send({ msg: "Error al borrar responsable" })
        }
   }
};
