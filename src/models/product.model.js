const mongoose = require("mongoose");
const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Truong nay bat buoc phai nhap'],
        unique:true,
    },
    // category:{
    //     type: ObjectID,
    // },
    price: {
        type:String,
        required:[true,'Truong nay bat buoc phai nhap'],
    }, 
    description: {
        type:String,
        required:[true,'Truong nay bat buoc phai nhap'],
    },
    image: String
});
module.exports = mongoose.model("Product", product_schema);