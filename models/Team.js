const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    key: String,
    text: String,
    value: String,
    image: {},
    sport: String,
    artUrl: String,
    rules: String,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;