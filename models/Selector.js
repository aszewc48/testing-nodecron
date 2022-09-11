const mongoose = require('mongoose')


const Selector = mongoose.model('Selector', { 
    minute: Number,
    hour: Number,
    day: Number,
    month: Number,
    id: String
})



    module.exports = Selector