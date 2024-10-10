const mongoose = require('mongoose')

const persona = new mongoose.Schema({
    persona_name : {
        type : String,
        required : true
    },
    tags : {
        type : String,
        required : true
    },
    industry : {
        type : String,
        required :true
    },
    tone_and_personality : {
        type : String,
        required :true
    },
    keywords : {
        type : String,
        required :true
    },
    background :{
        type : String,
        required : true
    },
    createdby : {
        type : String
    }
})

module.exports = mongoose.model('Persona',persona)