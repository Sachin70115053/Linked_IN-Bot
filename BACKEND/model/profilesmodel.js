const mongoose = require('mongoose')
const savedprofile = new mongoose.Schema({
    profile_URL : {
        type : String,
        required : true
    },
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required :true
    }
    ,
    createdby : {
        type : String
    }
})

module.exports = mongoose.model('SAVEDP',savedprofile)