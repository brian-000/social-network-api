const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "Wrong input" });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData } },
                    { new: true, runValidators: true }
                )
                    .then(dbThoughtData => {
                        if (!dbThoughtData) {
                            res.status(404).json({ message: 'No thought with this id.' });
                            return;
                        }
                        res.json(dbThoughtData);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    });
            })

    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No thought found." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({_id: params.id}, {
            new: true
        })
        .then((dbThoughtData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No thought found." });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));

    }
}

module.exports = thoughtController;