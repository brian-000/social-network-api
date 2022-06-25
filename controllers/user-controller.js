const { User } = require ('../models');

const userController = {
    getAllUsers(req, res) {
        User.find ({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(400).json(err);
        });
    }
}


module.exports = userController;