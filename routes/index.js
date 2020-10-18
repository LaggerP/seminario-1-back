// Middlewares
const middleToken = require ('../auth/authToken').verifyToken;

// Controllers
const userController = require('../controllers/UserController');
const userProfileController = require ('../controllers/UserProfileController');
const benefitsController = require('../controllers/BenefitsController');
const historyProfile = require ('../controllers/HistoryProfileExerciseController');

module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send({
      message: 'Example project did not give you access to the api web services',
   }));

   // User endpoints
   app.post('/api/user/register', userController.registerResponsable)
   app.get('/api/user/getUser/:id', middleToken, userController.findAllUserData);
   app.get('/api/user/list', middleToken, userController.list);

   // User Profile endpoints
   app.post('/api/profile/create', userProfileController.createProfile);
   app.get('/api/profile/list', userProfileController.list);
   app.post('/api/profile/update_points', userProfileController.updateProfilePoints);

   // History Profile-Exercise endpoints
   app.post('/api/history/new', historyProfile.create);
   app.get('/api/history/list', historyProfile.list);

   // Benefits endpoints
   app.get('/api/benefits/list', benefitsController.list);
};