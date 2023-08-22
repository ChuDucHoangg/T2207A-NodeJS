const Brand = require("./../models/brand.model");
const fs = require("fs");
exports.brand = async (req, res) =>{
    try{
        const brands = await Brand.find();
        res.render("brand/brand", { brands });
    }catch{
        res.send(err);
    }
}
exports.formBrand = (req, res) =>{
    const data = req.body;
    data.url = req._parsedOriginalUrl.path;
    res.render("brand/formbrand", {brand:data});
}
exports.postFormBrand = (req, res) => {
    const data = req.body;
    const file = req.file
    if(file) {
        const img = fs.readFileSync(file.path);
        data.image = {
            contentType: file.mimetype,
            data:img.toString("base64")
        }
    }
    const c = new Brand(data);
    c.save().then(() => {
        res.redirect("/auth/brand");
    }).catch(err => {
        res.send(err);
    })
}
exports.formEdit = async (req, res) => {
    const _id = req.params.id;
    try{
        const brand = await Brand.findById(_id);
        brand.url = req._parsedOriginalUrl.path;
        res.render("brand/formbrand", {brand:brand});
    }catch (error) {
        res.redirect("/auth/brand")
    }
}
exports.update = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    const brand = await Brand.findById(_id);
    try{
        const file = req.file;
        if(file) {
            const img = fs.readFileSync(file.path);
            data.image = {
                contentType: file.mimetype,
                data:img.toString("base64")
            }
        }else{
            data.image = brand.image;
        }
        await Brand.findByIdAndUpdate(_id, data);
        res.redirect("/auth/brand");
    }catch (error) {
        res.render("brand/formbrand", {brand:brand});
    }
}
exports.delete = async (req, res) => {
    const _id = req.params.id;
    try {
        await Brand.findByIdAndDelete(_id);
        res.redirect("/auth/brand");
    } catch (error) {
        res.redirect("/auth/brand");
    }
}