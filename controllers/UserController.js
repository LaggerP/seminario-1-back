const Sequelize = require('sequelize');
const user = require('../models').User;
const profile = require('../models').User_profile;
const auth = require('../auth/authToken');
const bcrypt = require("bcrypt");
const roleController = require('./RoleController');
const mailerController = require('./mailer/MailerControlles');
const profileController = require('../controllers/UserProfileController');
const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || require('../config/config.js').BCRYPT_ROUNDS
const generator = require('generate-password');

module.exports = {
   async asyncregisterResponsable(req, res) {
      const _user = await user.findOne({where: {username: req.body.username}});

      if (_user !== null) return res.status(409).send({status: 'register error', msg: "username already exist"})
      
      try {
         const _generatedPwd = await generator.generate({
            length: 10,
            numbers: true
         });

         const userCollection = await user.create({
            username: req.body.username,
            password: bcrypt.hashSync(_generatedPwd, BCRYPT_ROUNDS),
            email: req.body.email,
            firstname: req.body.first_name,
            lastname: req.body.last_name,
            role_id: 3
         });

         let dataToSend = {
            email: userCollection.dataValues.email,
            username: userCollection.dataValues.username,
            password: _generatedPwd
         }

         // send username and password to user account
         await mailerController.sendRegisterEmail(dataToSend)

         const currentProfile = req.body.profiles
         if (Object.keys(currentProfile).length !== 0 || currentProfile.length > 0) {
            currentProfile.user_id = userCollection.dataValues.id;
            const profileCollection = await profileController.createProfile(currentProfile)
            const response = Object.keys(profileCollection).length
            response !== 0 ? res.status(201).send({ msg: "user and profile was created" }) : res.status(401).send({ msg: "user/profile creation error" })
         } else {
            res.status(201).send({ msg: "user created" });
         }
      }
      catch (e) {
         res.status(400).send(e);
      }
      
   },
   async login(req, res) {
      const _userData = {
         username: req.body.username,
         password: req.body.password,
      }

      try {
         const _user = await user.findOne({where: {username: _userData.username}});

         // get token from user (if exists)
         const _loginToken = await auth.loginUser(_userData);

         // get all profiles associated to user account
         const _profiles =  await profileController.getAllProfilesByUser(_user.dataValues.id)

         return res.status(200).json({ profiles: _profiles, token: _loginToken, msg: "Success login" })
      }
      catch (e) {
         return res.status(400).json({ status: 400, msg: "Invalid username or password" })
      }
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
