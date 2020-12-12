const express = require('express');
const { default: minions } = require('../browser/store/minions');
const minionsRouter = express.Router();
const db = require('./db')

/*minionsRouter.param('minionId', (req, res, next, id) => {
    const minions = db.getAllFromDatabase('minions');
    const minionIndex = minions.findIndex(minion => minion.id === id);
    if(minionIndex !== -1){
        req.minionIndex = minionIndex;
        next();
    }
    else{
        res.status(404).send('oops not found');
    }
    console.log('here')
})*/

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.createMinion();
    db.addToDatabase('minions', newMinion);
    res.send(newMinion);
})

/*minionsRouter.get('/:minionId', (req, res, next) => {
    const minionList = db.getAllFromDatabase('minions');
    res.send(minionList[req.minionIndex]);
})*/

module.exports = minionsRouter;
