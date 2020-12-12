const express = require('express');
const minionsRouter = express.Router();
const db = require('./db')


minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.createMinion();
    db.addToDatabase('minions', newMinion);
    res.send(newMinion);
})

module.exports = minionsRouter;
