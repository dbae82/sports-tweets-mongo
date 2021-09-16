const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/teams', routes.team);
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/user', routes.user);
app.use('/api/v1/tweets', routes.tweet);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));