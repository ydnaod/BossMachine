const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body;
    const revenue = idea.numWeeks * idea.weeklyRevenue;
    if(revenue >= 1000000)
    {
        next();
    }
    else{
        res.status(400).send('sorry not enough cash');
    }
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
