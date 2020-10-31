const Sequelize = require('sequelize');
const consejos = require('../models').Consejos

module.exports = {

    list(_, res) {
        return consejos.findAll({
            where: {
                status: 1
            }
        })
            .then(consejos => res.status(200).send(consejos))
            .catch(error => res.status(409).send(error))
    },

    updateConsejo(req, res) {

        if (req.body.title != "") (consejos.update({ title: req.body.title }, { where: { id: req.body.id } }))

        if (req.body.content != "") (consejos.update({ content: req.body.content }, { where: { id: req.body.id } }))


        return consejos
            .then(consejoUpdated => res.status(200).send(consejoUpdated))
            .catch(error => res.status(400).send(error))
    },

    createConsejo(req, res) {
        return consejos
            .create({
                title: req.body.title,
                content: req.body.content,
            })
            .then(consejoCreated => res.status(201).send(consejoCreated))
            .catch(error => res.status(400).send(error))
    },


    deleteConsejo(req, res) {

        return consejos
            .update({
                status: 0,

            }, { where: { id: req.body.id } })
            .then(consejoDeleted => res.status(200).send(consejoDeleted))
            .catch(error => res.status(400).send(error))
    },



};
