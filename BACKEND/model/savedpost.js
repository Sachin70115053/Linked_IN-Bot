const mongoose = require('mongoose')

const post = new mongoose.Schema({
    content : {
        type : String
    },
    createdby : {
        type : String
    }
})

module.exports = mongoose.model('Post',post)