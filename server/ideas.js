const express = require('express');
const ideasRouter = express.Router();
const db = require('./db')

ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideas = db.getAllFromDatabase('ideas');
    const ideaIndex = ideas.findIndex(idea => idea.id === id);
    if(ideaIndex !== -1){
        req.ideaIndex = ideaIndex;
        next();
    }
    else{
        res.status(404).send('oops not found');
    }
    console.log('here')
})

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
})

ideasRouter.post('/', (req, res, next) => {
    const newidea = db.createidea();
    db.addToDatabase('ideas', newidea);
    res.send(newidea);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaList = db.getAllFromDatabase('ideas');
    res.send(ideaList[req.ideaIndex]);
})

ideasRouter.post('/:ideaId', (req, res, next) => {
    const updatedidea = db.createidea();
    updatedidea.id = req.params.ideaId;
    console.log(updatedidea);
    res.send(db.updateInstanceInDatabase('ideas', updatedidea));
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaList = db.getAllFromDatabase('ideas');
    console.log(req.params);
    res.status(204).send(ideaList[req.ideaIndex]);
    db.deleteFromDatabasebyId('ideas', req.params.ideaId);
})




module.exports = ideasRouter;
