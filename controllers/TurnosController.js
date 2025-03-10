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

      if (req.body.turn_date != "") (await turnos.update({ fecha: req.body.turn_date }, { where: { id: req.body.id } }))

      if (req.body.turn_time != "") (await turnos.update({ hora: req.body.turn_time }, { where: { id: req.body.id } }))

      if (req.body.comments != "") (await turnos.update({ comentarios: req.body.comments }, { where: { id: req.body.id } }))

      res.status(200).send({msg:"Turno actualizado"})
   },


   async deleteTurn(req, res) {
      return turnos
         .update({
            status: 0,
         }, { where: { id: req.body.id } })
         .then(turnDeleted => res.status(201).send(turnDeleted))
         .catch(error => res.status(400).send(error))
   },

};
