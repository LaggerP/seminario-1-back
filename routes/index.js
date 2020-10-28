// Middlewares
const middleToken = require ('../auth/authToken').verifyToken;

// Controllers
const userController = require('../controllers/UserController');
const userProfileController = require ('../controllers/UserProfileController');
const benefitsController = require('../controllers/BenefitsController');
const administrarController = require('../controllers/AdministrarController');
const historyProfile = require ('../controllers/HistoryProfileExerciseController');

module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send({
      message: 'Example project did not give you access to the api web services',
   }));

   // User endpoints
   app.post('/api/user/register', userController.asyncregisterResponsable)
   app.post('/api/user/login', userController.login)
   app.get('/api/user/getUser/:id', middleToken, userController.findAllUserData);
   app.get('/api/user/list', middleToken, userController.list);

   // User Profile endpoints
   app.post('/api/profile/create', userProfileController.createProfile);

   // Medico Responsable administrar view endpoints
   app.get('/api/administrar/list/:id', administrarController.listByMedicId);
   app.post('/api/administrar/update', administrarController.updatePatient);

   // History Profile-Exercise endpoints
   app.post('/api/history/new', historyProfile.create);
   app.get('/api/history/list', historyProfile.list);

   // Benefits endpoints
   app.get('/api/benefits/list', benefitsController.list);
   app.post('/api/benefits/redeem', benefitsController.redeemBenefit);

   
};