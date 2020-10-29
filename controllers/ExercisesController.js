const Sequelize = require('sequelize');
const userProfile = require('../models').User_profile;
const exerciseCounter = require('../models').Exercise_counter;
const exerciseCountingProfile = require('../models').Exercise_counter_profile;


module.exports = {
   async getExercisesByProfile(req, res) {
      let assignedExercisesIds = [];
      let profileExercises = [];
      const _countingExercisesByProfile = await exerciseCountingProfile.findAll({ where: { profile_id: req.params.id } })
      await _countingExercisesByProfile.map(data => {
         assignedExercisesIds.push(data.dataValues.exercise_id)
      })

      
  
      try {
        
         const counterModule = await exerciseCounter.findAll({});

         await counterModule.map(exercise => {
            if(assignedExercisesIds.includes(exercise.dataValues.id)){
               exercise.dataValues.module = "Contador";
               profileExercises.push(exercise.dataValues)
            }
         })
         res.status(201).send({msg: 'send profiles exercises', profileExercises})

      } catch (e) {
         res.status(400).send(e)
      }
   },

};
