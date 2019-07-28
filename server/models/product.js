const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique: 1,
        maxLength: 100
    },
    description:{
        type:String,
        required:true,
        maxLength: 20000
    },
    price:{
        type:Number,
        required:true,
        maxLength: 100
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping:{
        required:true,
        type:Boolean
    },
    available:{
        required:true,
        type:Boolean
    },
    genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    sold:{
        type:Number,
        maxLength: 100,
        default:0
    },
    publish:{
        // required:true,
        type:Boolean,
        default:true
    },
    images:{
        type:Array,
        default:[]
    }

},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports = { Product }