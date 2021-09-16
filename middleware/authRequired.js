const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;

        if (typeof bearerHeader === 'undefined') {
            return res.sendStatus(403);
        }

        const token = bearerHeader.split(" ")[1];
        const payload = await jwt.verify(token, process.env.SECRET_KEY);
        req.userId = payload._id;

        next();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: 500, message: "Internal Server Error" });
    }
};