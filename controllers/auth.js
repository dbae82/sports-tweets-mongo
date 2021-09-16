const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (foundUser)
            return res.status(400).json({
                status: 400,
                message: 'Email address has already been registered. Please try again',
            });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const createdUser = await db.User.create({ ...req.body, password: hash });

        return res
            .status(201)
            .json({ status: 201, message: 'success', createdUser });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again',
        });
    }
};

const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ username: req.body.username }).select(
            '+password'
        );

        if (!foundUser) {
            return res
                .status(400)
                .json({ status: 400, message: 'Username or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

        if (isMatch) {
            const token = jwt.sign({ _id: foundUser._id }, process.env.SECRET_KEY, {
                expiresIn: '1d',
            });

            return res.status(200).json({
                status: 200,
                message: 'success',
                token,
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Username or password is incorrect',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again',
        });
    }
};

module.exports = {
    register,
    login,
};