const { User } = require('../models');

const show = async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.userId).populate('favTeam');
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: foundUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const update = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

const destroy = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: deletedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = {
    show,
    update,
    destroy,
};