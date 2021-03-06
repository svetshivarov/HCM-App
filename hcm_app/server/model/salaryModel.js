const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId, ref: 'userdb',
        // type:String,
        required: true
    },
    salary: Number,
    bonus: Number,
    total: Number
})

const SalaryDB = mongoose.model('salarydb', schema);

module.exports = SalaryDB;