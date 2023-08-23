const mongoose = require("mongoose");
const category_schema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Truong nay bat buoc phai nhap'],
        minLength: 1,
        maxLength: 255
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    description: {
        type:String,
        required: [true,'Truong nay bat buoc phai nhap'],
    },
});
module.exports = mongoose.model("Category", category_schema);