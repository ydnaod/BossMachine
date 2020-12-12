const express = require('express');
const minionsRouter = express.Router();
const db = require('./db')

minionsRouter.param('minionId', (req, res, next, id) => {
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
})

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.createMinion();
    db.addToDatabase('minions', newMinion);
    res.send(newMinion);
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionList = db.getAllFromDatabase('minions');
    res.send(minionList[req.minionIndex]);
})

minionsRouter.post('/:minionId', (req, res, next) => {
    const updatedMinion = db.createMinion();
    updatedMinion.id = req.params.minionId;
    console.log(updatedMinion);
    res.send(db.updateInstanceInDatabase('minions', updatedMinion));
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionList = db.getAllFromDatabase('minions');
    console.log(req.params);
    res.status(204).send(minionList[req.minionIndex]);
    db.deleteFromDatabasebyId('minions', req.params.minionId);
})

module.exports = minionsRouter;
