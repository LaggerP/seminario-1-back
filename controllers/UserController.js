const Sequelize = require('sequelize');
const user = require('../models').User;
const profile = require('../models').User_profile;
const auth = require('../auth/authToken');
const bcrypt = require("bcrypt");
const roleController = require('./RoleController');
const profileController = require ('../controllers/UserProfileController');
const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || require('../config/config.js').BCRYPT_ROUNDS

module.exports = {
   registerResponsable(req, res) {
      return user
         .findOrCreate({
            where: {
               username: req.body.username,
            },
            defaults: {
               username: req.body.username,
               password: "paciente",
               email: req.body.email,
               firstname: req.body.first_name,
               lastname: req.body.last_name,
               role_id: 3
            },
         })
         .then(async user => {

            const currentProfile = req.body.profiles
            currentProfile.user_id = user[0].dataValues.id;
            console.log(currentProfile)
            await profileController.createProfile(currentProfile)
            return res.status(200).send("user created")

         })
         .catch(error => res.status(400).json({ error: error, message: "Register error" }))
   },
   async login(req, res) {
      return user
      .findOne({ where: 
         { username: req.body.username } 
      }).then (user => {
         const {password, _role_id} = user.dataValues
         if (password === req.body.password ){

            return res.status(200).json({status: 200, msg: "sesion iniciada"})
         } else {
            res.status(400).json({status: 400, error: "usuario o contraseña incorrecta"})
         }

      }).catch(error => res.status(400).json({status: 400, error: "usuario o contraseña incorrecta"}));
	
	},
   async list(_, res) {
      return user.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   async findAllUserData(req, res) {
      return user.findAll({ where: { id: req.params.id } })
         .then(async user => {
            const dataRole = await roleController.getRoleById(user[0].role_id); // get role by user role_id
            user[0].dataValues.rol = dataRole.rol // embedding role name in user information
            res.status(200).send(user)
         })
         .catch(error => res.status(400).send(error))
   },
};
