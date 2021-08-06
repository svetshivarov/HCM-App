const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    department: {
        type:String,
        required: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    },
    status: String
})

const DeptDB = mongoose.model('Deptdb', schema);

module.exports = DeptDB;