const { User } = require ('../models');

const userController = {
    getAllUsers(req, res) {
        User.find ({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(400).json(err);
        });
    },

    getUserById({params}, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({message: 'No user with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }


}


module.exports = userController;