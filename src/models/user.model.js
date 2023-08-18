const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    fullname: {
        type:String,
        required:[true,'Truong nay bat buoc phai nhap'],
        minLength:[10,"So luong do dai toi thieu 10"]
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        unique:true,
        validate: {
            validator: (v) =>{
                const re =
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    return v.match(re);
            },
            message: (t)=> `${t.value} khong phai dinh dang email`
        }
    }, 
    password:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("User", user_schema);