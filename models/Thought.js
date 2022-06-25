//Thought Model
const {Schema, model, Types} = require ('mogoose');

const ThoughtScehma = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    }
})

//Reaction sub document