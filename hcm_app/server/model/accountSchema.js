const mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    username: {
        type:String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }

})

const AccountDB = mongoose.model('accountdb', AccountSchema);

module.exports = AccountDB;