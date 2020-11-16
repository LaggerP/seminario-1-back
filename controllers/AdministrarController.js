const { assign } = require('nodemailer/lib/shared');
const Sequelize = require('sequelize');
const user = require('../models').User;
const userProfile = require('../models').User_profile;
const medicoResponsable = require('../models').Medico_responsable;
const exerciseCounter = require('../models').Exercise_counter;
const exerciseReading = require('../models').Exercise_reading;
const turnos = require('../models').Turnos;


const exerciseCountingProfile = require('../models').Exercise_counter_profile;
const exerciseReadingProfile = require('../models').Exercise_reading_profile;


const profileController = require('../controllers/UserProfileController')

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


   //No sé como hacer acá, debería tener 2 listTurns? Uno para médico que sería este y otro para paciente?
   async listTurns(req, res) {
      
      console.log("Llegué al listTurns");

      return turnos.findAll({
         where: {
            user_id: req.body.user_id,
            status: 1
         }
     })
         .then(turns => res.status(200).send(turns))
         .catch(error => res.status(409).send(error))
   },


   async assignTurn(req, res) {
      
      console.log("Llegué a assignTurn");

      return turnos
            .create({
                fecha: req.body.fecha,
                hora: req.body.hora,
                comentarios: req.body.comentarios,
                user_id: req.body.user_id,
                profile_id: req.body.profile_id
            })
            .then(assignedTurn => res.status(201).send(assignedTurn))
            .catch(error => res.status(400).send(error))
   },


   async updateTurn(req, res) {

      console.log("Llegué a updateTurn");

      if (req.body.fecha != "") (turnos.update({ fecha: req.body.fecha }, { where: { id: req.body.id } }))

      if (req.body.hora != "") (turnos.update({ hora: req.body.hora }, { where: { id: req.body.id } }))

      if (req.body.comentarios != "") (turnos.update({ comentarios: req.body.comentarios }, { where: { id: req.body.id } }))

      return turnos
         .then(turnUpdated => res.status(200).send(turnUpdated))
         .catch(error => res.status(400).send(error))
   },


   async deleteTurn(req, res) {

      console.log("Llegué a deleteTurn");

      return turnos
            .update({
                status: 0,

            }, { where: { id: req.body.id } })
            .then(turnDeleted => res.status(200).send(turnDeleted))
            .catch(error => res.status(400).send(error))
   },

   
   async assignExercises(req, res) {
      const { selectedOption, profile_id } = req.body;
      selectedOption.map(async (option) => {
         const _response = await exerciseCountingProfile.findOne({where:{exercise_id: option.value, profile_id: profile_id}})
         if (option.module === 'Contador') {
            try {
               const created = await exerciseCountingProfile.create({
                  exercise_id: option.value,
                  profile_id: profile_id
               })
            } catch {
               res.status(400).send({msg: 'error with assignExercises', status: 400})
            }

         } else if (option.module === 'Lectura') {
            try {
               const created = await exerciseReadingProfile.create({
                  exercise_id: option.value,
                  profile_id: profile_id
               })
            } catch {
               res.status(400).send({msg: 'error with assignExercises', status: 400})
            }
         } else {
            res.status(400).send({msg: 'error with assignExercises, all exist!', status: 400})
         }
      })
      res.status(201).send({msg: 'all exercises was assigned', status: 201})
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


};
