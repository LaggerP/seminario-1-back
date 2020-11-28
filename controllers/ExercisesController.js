const Sequelize = require('sequelize');
const moment = require('moment');
const userProfile = require('../models').User_profile;
const exerciseCounter = require('../models').Exercise_counter;
const exerciseReading = require('../models').Exercise_reading;
const exerciseCountingProfile = require('../models').Exercise_counter_profile;
const exerciseReadingProfile = require('../models').Exercise_reading_profile;
const userProfileController = require ('./UserProfileController.js');



var CronJob = require('cron').CronJob;
// Minutos, horas, dia, mes, dia de la semana
var job = new CronJob('0 12 * * *', async function() {
   const _countingExercisesByProfile = await exerciseCountingProfile.findAll({ });
   const _readingExercisesByProfile = await exerciseReadingProfile.findAll({ });

   const _actualDate = moment(new Date()).format('YYYY-MM-DD')
   _readingExercisesByProfile.map(async date => {
      const _dbDate = moment(date.dataValues.updatedAt).format('YYYY-MM-DD')
      if (moment(_actualDate).isAfter(_dbDate, 'day')) {
         await exerciseReadingProfile.update({ status: null }, { where: { id: date.dataValues.id } })
      }
   })

   _countingExercisesByProfile.map(async date => {
      const _dbDate = moment(date.dataValues.updatedAt).format('YYYY-MM-DD')
      if (moment(_actualDate).isAfter(_dbDate, 'day')) {
         await exerciseCountingProfile.update({ status: null }, { where: { id: date.dataValues.id } })
      }
   })

}, null, true, 'America/Argentina/Buenos_Aires');
job.start();


module.exports = {
   async getExercisesByProfile(req, res) {
      let countingExercisesIds = [];
      let readingExercisesIds = [];

      let profileExercises = [];
      const _countingExercisesByProfile = await exerciseCountingProfile.findAll({ where: { profile_id: req.params.id } })
      await _countingExercisesByProfile.map(data => {
         countingExercisesIds.push({exercise_id: data.dataValues.exercise_id, status: data.dataValues.status, lastdate: data.dataValues.updatedAt})
      })

      const _readingExercisesByProfile = await exerciseReadingProfile.findAll({ where: { profile_id: req.params.id } })
      await _readingExercisesByProfile.map(data => {
         readingExercisesIds.push({exercise_id: data.dataValues.exercise_id, status: data.dataValues.status, lastdate: data.dataValues.updatedAt})
      })

      try {
         // Mapea y devuelve todos los ejercicios 'Contador' que tiene asignado el perfil
         const counterModule = await exerciseCounter.findAll({});
         await counterModule.map(async exercise => {
            await countingExercisesIds.map (data => {
               if (data.exercise_id === exercise.dataValues.id) {
                  exercise.dataValues.module = "Contador";
                  exercise.dataValues.finished = data.status;
                  exercise.dataValues.lastdate = data.lastdate;
                  profileExercises.push(exercise.dataValues)
               }
            })
         })

         // Mapea y devuelve todos los ejercicios 'Lectura' que tiene asignado el perfil
         const readingModule = await exerciseReading.findAll({});
         await readingModule.map(async exercise => {
            await readingExercisesIds.map (data => {
               if (data.exercise_id === exercise.dataValues.id) {
                  exercise.dataValues.module = "Lectura";
                  exercise.dataValues.finished = data.status;
                  exercise.dataValues.lastdate = data.lastdate;
                  profileExercises.push(exercise.dataValues)
               }
            })
         })
         res.status(201).send({ msg: 'send profiles exercises', profileExercises })
      } catch (e) {
         res.status(400).send(e)
      }
   },
   async updateStatus(req, res) {
      const { exercise_id, profile_id, module } = req.body;
      if (module === "Contador") {
         return exerciseCountingProfile.update({
            status: 1
         }, { where: { profile_id: profile_id, exercise_id: exercise_id } })
            .then(async updatedExercise => {
               await userProfileController.updateBenefitsPoints(profile_id);
               res.status(201).send(updatedExercise)
            })
            .catch(error => res.status(400).send(error))
      } else if (module === 'Lectura') {
         return exerciseReadingProfile.update({
            status: 1
         }, { where: { profile_id: profile_id, exercise_id: exercise_id } })
            .then(async updatedExercise => {
               await userProfileController.updateBenefitsPoints(profile_id);
               res.status(201).send(updatedExercise)
            })
            .catch(error => res.status(400).send(error))
      }
   },

};
