const Product = require("./../models/product.model");
const fs = require("fs");
exports.product = async (req, res)=>{
    try{
        const products = await Product.find();

        res.render("product/product", { products }); 
    }catch{
        res.send(err);
    }
}
exports.addproduct = (req, res)=>{
    const data = req.body;
    data.url = req._parsedOriginalUrl.path;
    res.render("product/addproduct",{product:data});
}
exports.postAddProduct = (req, res)=>{
    const data = req.body;
    const file = req.file
    if(file) {
        const img = fs.readFileSync(file.path);
        data.image = {
            contentType: file.mimetype,
            data:img.toString("base64")
        }
    }
    const p = new Product(data);
    p.save().then(()=>{
        res.redirect("/auth/product");
    }).catch(err=>{
        res.send(err);
    })
}

exports.formEdit = async (req,res) =>{
    const _id = req.params.id;
    try{
        const product = await Product.findById(_id);
        product.url = req._parsedOriginalUrl.path;
        res.render("product/addproduct",{product:product});
    }catch (error) {
        res.redirect("/auth/product")
    }
}
exports.update = async (req, res) =>{
    const _id = req.params.id;
    const data = req.body;
    const product = await Product.findById(_id);
    try {
        const file = req.file;
        if(file) {
            const img = fs.readFileSync(file.path);
            data.image = {
                contentType: file.mimetype,
                data:img.toString("base64")
            }
        }else{
            data.image = product.image;
        }
        await Product.findByIdAndUpdate(_id,data);
        res.redirect("/auth/product");
    }catch (error) {
        res.render("product/addproduct",{product:product});
    }
}


exports.delete =  async (req,res)=>{
    const _id = req.params.id;
    try {
        await Product.findByIdAndDelete(_id);
        res.redirect("/auth/product");
    } catch (error) {
        res.redirect("/auth/product");
    }
}