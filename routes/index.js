/* Controllers */
const usuarioController = require('../controllers/UserController');


module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send({
      message: 'Example project did not give you access to the api web services',
   }));

   app.get('/api/usuario/list', usuarioController.findAllData);
};