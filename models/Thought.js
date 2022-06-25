//Thought Model
const {Schema, model, Types} = require ('mogoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtScehma = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    }
})

//Reaction sub document