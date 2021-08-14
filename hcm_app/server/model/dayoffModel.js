const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'userdb',
        // type:String,
        required: true
    },
    start: Date,
    last: Date,
    total: Number
})

const DayoffDB = mongoose.model('dayoffdb', schema);

module.exports = DayoffDB;