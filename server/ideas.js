const express = require('express');
const ideasRouter = express.Router();
const db = require('./db')
const bodyParser = require('body-parser');

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
})


ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
})

ideasRouter.post('/', (req, res, next) => {
    console.log(req.body);
    db.addToDatabase('ideas', req.body);
    res.send(req.body);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaList = db.getAllFromDatabase('ideas');
    res.send(ideaList[req.ideaIndex]);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    res.send(db.updateInstanceInDatabase('ideas', req.body));
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaList = db.getAllFromDatabase('ideas');
    res.status(204).send(ideaList[req.ideaIndex]);
    db.deleteFromDatabasebyId('ideas', req.params.ideaId);
})

module.exports = ideasRouter;
