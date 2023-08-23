const mongoose = require("mongoose");
const brand_schema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Truong nay bat buoc phai nhap'],
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    image: {
        data: String,
        contentType:String
    },
    description: {
        type:String,
        required: [true,'Truong nay bat buoc phai nhap'],
    },
});
module.exports = mongoose.model("Brand", brand_schema);