const mongoose = require("mongoose");
const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Truong nay bat buoc phai nhap'],
        minLength: 1,
        maxLength: 255
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    price: {
        type:Number,
        min:0,
        required:[true,'Truong nay bat buoc phai nhap'],
    }, 
    description: {
        type:String,
        required: true
    },
    image: {
        data: String,
        contentType:String
    }
});
module.exports = mongoose.model("Product", product_schema);