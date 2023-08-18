const Product = require("./../models/product.model");
exports.product = async (req, res)=>{
    try{
        const products = await Product.find();

        res.render("product", { products }); 
    }catch{
        res.send(err);
    }
}
exports.addproduct = (req, res)=>{
    res.render("addproduct");
}
exports.postAddProduct = (req, res)=>{
    const data = req.body;
    const p = new Product(data);
    p.save().then(()=>{
        res.redirect("/auth/product");
    }).catch(err=>{
        res.send(err);
    })
}