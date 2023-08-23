const Product = require("./../models/product.model");
const Category = require("./../models/category.model");
const Brand = require("./../models/brand.model");
const fs = require("fs");
exports.product = async (req, res)=>{
    try{
        const products = await Product.find().populate("category").populate("brand").exec();
        res.render("product/product", { products:products }); 
    }catch{
        res.send(err);
    }
}
exports.addproduct = async (req, res)=>{
    try{
        const categories = await Category.find();
        const brands = await Brand.find();
        const data = req.body;
        data.url = req._parsedOriginalUrl.path;
        res.render("product/addproduct",{ product: data, categories: categories, brands: brands });
    }catch (error) {
        res.send(error);
    }
    
}
exports.postAddProduct = async (req, res)=>{
    try {
        const data = req.body;
        const file = req.file;
        if (file) {
            const img = fs.readFileSync(file.path);
            data.image = {
                contentType: file.mimetype,
                data: img.toString("base64")
            }
        }
        const p = new Product(data);
        await p.save();
        res.redirect("/auth/product");
    } catch (error) {
        res.send(error);
    }
}

exports.formEdit = async (req,res) =>{
    const _id = req.params.id;
    const categories = await Category.find();
    const brands = await Brand.find();
    try{
        const product = await Product.findById(_id).populate("category").populate("brand").exec();
        product.url = req._parsedOriginalUrl.path;
        res.render("product/addproduct",{product:product , categories: categories, brands: brands});
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
        res.render("product/addproduct",{product:product , categories: categories, brands: brands});
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