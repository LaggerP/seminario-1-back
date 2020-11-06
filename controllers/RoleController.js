const Sequelize = require('sequelize');
const role = require ('../models').Role
module.exports = {
   getRoleById(_id){
      return role.findOne({ 
         attributes:["rol"],
         raw: true, 
         where: { id: _id } });

   },
   create(req, res) {
      return user
         .create({
            username: req.params.username,
            status: req.params.status
         })
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   list(_, res) {
      return user.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
   async findAllData(req, res) {
      return user.findAll({
         
      })
      .then(user => {
         getRole(user.role_id)
         res.status(200).send(user)
      })
         .catch(error => res.status(400).send(error))
   },
   findAllDataByUser(req, res) {
      return user.findAll({})
         .then(user => res.status(200).send(user))
         .catch(error => res.status(400).send(error))
   },
};
