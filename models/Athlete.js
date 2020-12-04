const mongoose = require('mongoose');

const athleteSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    sport: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    createdAt: {
        type: String,
    },
    desc: {
        type: String,
    },
    location: {
        type: String
    },
    team: {
        type: String
    },
    image: {
        type: String
    }
    
})

const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = { Athlete }