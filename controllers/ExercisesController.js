const Sequelize = require('sequelize');
const userProfile = require('../models').User_profile;
const exerciseCounter = require('../models').Exercise_counter;
const exerciseReading = require('../models').Exercise_reading;
const exerciseCountingProfile = require('../models').Exercise_counter_profile;
const exerciseReadingProfile = require('../models').Exercise_reading_profile;
const userProfileController = require ('./UserProfileController.js')

module.exports = {
   async getExercisesByProfile(req, res) {
      let countingExercisesIds = [];
      let readingExercisesIds = [];

      let profileExercises = [];
      const _countingExercisesByProfile = await exerciseCountingProfile.findAll({ where: { profile_id: req.params.id } })
      await _countingExercisesByProfile.map(data => {
         countingExercisesIds.push({exercise_id: data.dataValues.exercise_id, status: data.dataValues.status})
      })

      const _readingExercisesByProfile = await exerciseReadingProfile.findAll({ where: { profile_id: req.params.id } })
      await _readingExercisesByProfile.map(data => {
         readingExercisesIds.push({exercise_id: data.dataValues.exercise_id, status: data.dataValues.status})
      })

      try {
         // Mapea y devuelve todos los ejercicios 'Contador' que tiene asignado el perfil
         const counterModule = await exerciseCounter.findAll({});
         await counterModule.map(async exercise => {
            await countingExercisesIds.map (data => {
               if (data.exercise_id === exercise.dataValues.id) {
                  exercise.dataValues.module = "Contador";
                  exercise.dataValues.finished = data.status
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
                  exercise.dataValues.finished = data.status
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
      if (module === 'Contador') {
         return exerciseCountingProfile.update({
            status: 1
         }, { where: { profile_id: profile_id, exercise_id: exercise_id } })
            .then(async updatedExercise => {
               await userProfileController.updateBenefitsPoints(profile_id);
               console.log(newPoints)
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
   }
};
