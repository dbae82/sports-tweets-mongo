const db = require('../models');

const index = (req, res) => {
    db.Team.find({}, (error, foundTeams) => {
        if (error) {
            console.log('Error in teams#index:', error);
            return res.send('Incomplete teams#index controller function');
        }
        res.status(200).json({
            teams: foundTeams,
        });
    });
};

const show = (req, res) => {
    db.Team.findById(req.params.id, (error, foundTeam) => {
        if (error) {
            console.log('Error in teams#show:', error);
            return res.send('Incomplete teams#show controller function');
        }
        res.status(200).json({
            team: foundTeam,
        });
    });
};

module.exports = { index, show, };