const db = require('./models');
const data = require('./teamData.json');

db.Team.deleteMany({}, (error, deletedTeams) => {
    db.Team.create(data.teams, (error, seededTeams) => {
        if (error) console.log(error);
        console.log(data.teams.length, 'Teams created successfully');
        process.exit();
    });
});