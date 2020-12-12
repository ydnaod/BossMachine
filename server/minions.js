const express = require('express');
const minionsRouter = express.Router();
const db = require('./db')
const bodyParser = require('body-parser');

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
    db.addToDatabase('minions', req.body);
    res.status(201).send(req.body);
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionList = db.getAllFromDatabase('minions');
    res.send(minionList[req.minionIndex]);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    res.send(db.updateInstanceInDatabase('minions', req.body));
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionList = db.getAllFromDatabase('minions');
    res.status(204).send(minionList[req.minionIndex]);
    db.deleteFromDatabasebyId('minions', req.params.minionId);
})

module.exports = minionsRouter;
