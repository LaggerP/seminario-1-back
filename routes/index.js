// Middlewares
const middleToken = require ('../auth/authToken').verifyToken;

// Controllers
const userController = require('../controllers/UserController');
const userProfileController = require ('../controllers/UserProfileController');
const benefitsController = require('../controllers/BenefitsController');
const administrarController = require('../controllers/AdministrarController');
const exercisesController = require ('../controllers/ExercisesController')
const historyProfile = require ('../controllers/HistoryProfileExerciseController');
const consejosController = require('../controllers/ConsejosController');


module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send({
      message: 'Example project did not give you access to the api web services',
   }));

   // User endpoints
   app.post('/api/user/register', userController.registerResponsable)
   app.post('/api/user/login', userController.login)
   app.get('/api/user/getUser/:id', middleToken, userController.findAllUserData);
   app.get('/api/user/list', middleToken, userController.list);

   // User Profile endpoints
   app.post('/api/profile/create', userProfileController.createProfile);
   app.get('/api/profile/:id', userProfileController.getProfileById);

   // Medico Responsable administrar view endpoints
   app.get('/api/administrar/list/:id', administrarController.listByMedicId);
   app.post('/api/administrar/update', administrarController.updatePatient);
   app.get('/api/administrar/exercises', administrarController.getAllExercises);
   app.post('/api/administrar/setExercises', administrarController.assignExercises);


   // History Profile-Exercise endpoints
   app.post('/api/history/new', historyProfile.create);
   app.get('/api/history/list', historyProfile.list);

   // Benefits endpoints
   app.get('/api/benefits/list', benefitsController.list);
   app.post('/api/benefits/redeem', benefitsController.redeemBenefit);

   // Consejos endpoints
   app.get('/api/consejos/list', consejosController.list);
   app.post('/api/consejos/update', consejosController.updateConsejo);
   app.post('/api/consejos/delete', consejosController.deleteConsejo);
   app.post('/api/consejos/create', consejosController.createConsejo);

   // Exercises endpoinst
   app.get('/api/exercises/exerciseByProfileId/:id', exercisesController.getExercisesByProfile);
   app.post('/api/exercises/updateStatus', exercisesController.updateStatus);

   
};