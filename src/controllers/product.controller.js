const Product = require("./../models/product.model");
exports.addproduct = (req, res)=>{
    res.render("addproduct");
}
exports.postAddProduct = (req, res)=>{
    const data = req.body;
    const p = new Product(data);
    p.save().then(()=>{
        res.send("Done");
    }).catch(err=>{
        res.send(err);
    })
}