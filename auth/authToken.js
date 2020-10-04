const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || require('../config/config').DEV_SECRET
const usuario = require('../models').usuarios
const bcrypt = require("bcrypt");

module.exports = {
   async verifyToken(req, res, next) {
      let token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, SECRET, (err) => {
         if (err) {
            res.status(500).json({ error: "Not Authorized" });
         } else {
            next();
         }
      });
   },

   async loginUser(user) {
      try {
         // Find the User from database and get all data
         let _details = await usuario.findOne({ where: { username: user.username } });

         // Compare if my text plain pass is equal to encrypted password
         let passwordIsValid = bcrypt.compareSync(user.password, _details.password);
         if (!passwordIsValid) throw Error("Invalid username/password")

         // Create token of existing user
         let token = jwt.sign({
            id: _details.id
         }, SECRET, {
            expiresIn: 86400 // expires in 24 hours
         });
         return token;
      } catch (e) {
         // return a Error message describing the reason     
         throw Error("Error while Login User")
      }
   },

   async registerUser(user) {
      try {
         // Creating token for new user
         var token = jwt.sign({
            id: user.id
         }, SECRET, {
            expiresIn: 86400 // expires in 24 hours
         });
         return token;

      } catch (e) {
         // return a Error message describing the reason 
         throw Error("Error while Creating User")
      }
   },
};