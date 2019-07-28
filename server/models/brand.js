const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique: 1,
        maxLength: 100
    }
})

const Brand = mongoose.model('Brand',brandSchema);

module.exports = { Brand }