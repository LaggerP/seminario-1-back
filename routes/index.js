// Middlewares
const middleToken = require ('../auth/authToken');

// Controllers
const userController = require('../controllers/UserController');


module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send({
      message: 'Example project did not give you access to the api web services',
   }));

   // User endpoint
   app.post('/api/user/register', userController.register)
   app.get('/api/user/getUser/:id', middleToken.verifyToken, userController.findAllUserData);
   app.get('/api/user/list', middleToken.verifyToken, userController.list);
};