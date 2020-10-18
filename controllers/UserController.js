const Sequelize = require('sequelize');
const user = require('../models').User;
const profile = require('../models').User_profile;
const auth = require('../auth/authToken');
const bcrypt = require("bcrypt");
const roleController = require('./RoleController');
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
            await profile.createProfile(currentProfile, user)
            return res.status(200).send("user created")
         })
         .catch(error => res.status(400).json({ error: error, message: "Register error" }))
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
