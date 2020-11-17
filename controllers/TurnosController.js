const { assign } = require('nodemailer/lib/shared');
const Sequelize = require('sequelize');
const turnos = require('../models').Turno;

module.exports = {
   async medicTurns(req, res) {
      try {
         const _turns = await turnos.findAll({ where: { user_id: req.params.id, status: 1 } })
         res.status(200).send({turns: _turns})
      } catch (error) {
         res.status(409).send(error)
      }
   },

   async profileTurns(req, res) {
      try {
         const _turns = await turnos.findAll({ where: { profile_id: req.params.id, status: 1 } })
         res.status(200).send({turns: _turns})
      } catch (error) {
         res.status(409).send(error)
      }
   },

   async updateTurn(req, res) {
      console.log("Llegué a updateTurn");

      if (req.body.fecha != "") (turnos.update({ fecha: req.body.fecha }, { where: { id: req.body.id } }))

      if (req.body.hora != "") (turnos.update({ hora: req.body.hora }, { where: { id: req.body.id } }))

      if (req.body.comentarios != "") (turnos.update({ comentarios: req.body.comentarios }, { where: { id: req.body.id } }))

      return turnos
         .then(turnUpdated => res.status(200).send(turnUpdated))
         .catch(error => res.status(400).send(error))
   },


   async deleteTurn(req, res) {
      console.log(req.body.id)
      console.log("Llegué a deleteTurn");
      return turnos
         .update({
            status: 0,

         }, { where: { id: req.body.id } })
         .then(turnDeleted => res.status(201).send(turnDeleted))
         .catch(error => res.status(400).send(error))
   },

};
