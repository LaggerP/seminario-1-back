const Sequelize = require('sequelize');
const user = require('../models').User;
const auth = require('../auth/authToken');
const bcrypt = require("bcrypt");
const roleController = require('./RoleController');
const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || require('../config/config.js').BCRYPT_ROUNDS

module.exports = {
   register(req, res) {
      return user
         .findOrCreate({
            where: {
               username: req.body.username,
            },
            defaults: {
               username: req.body.username,
               password: bcrypt.hashSync(req.body.password, BCRYPT_ROUNDS),
               email: req.body.email,
               firstname: req.body.firstname,
               lastname: req.body.lastname,
               role_id: req.body.role_id
            },
         })
         .then(async user => {
            let registerToken = await auth.registerUser(user)
            return res.status(200).json({ token: registerToken, message: `User: ${user.username} created` })
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
