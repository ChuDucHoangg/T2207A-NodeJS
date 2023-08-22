const Category = require("./../models/category.model");
exports.category = async (req, res) =>{
    try{
        const categorys = await Category.find();
        res.render("category/category", { categorys });
    }catch{
        res.send(err);
    }
}
exports.formCategory = (req, res) =>{
    const data = req.body;
    data.url = req._parsedOriginalUrl.path;
    res.render("category/formcategory", {category:data});
}
exports.postFormCategory = (req, res) => {
    const data = req.body;
    const c = new Category(data);
    c.save().then(() => {
        res.redirect("/auth/category");
    }).catch(err => {
        res.send(err);
    })
}
exports.formEdit = async (req, res) => {
    const _id = req.params.id;
    try{
        const category = await Category.findById(_id);
        category.url = req._parsedOriginalUrl.path;
        res.render("category/formcategory", {category:category});
    }catch (error) {
        res.redirect("/auth/category")
    }
}
exports.update = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    const category = await Category.findById(_id);
    try{
        await Category.findByIdAndUpdate(_id, data);
        res.redirect("/auth/category");
    }catch (error) {
        res.render("category/formcategory", {category:category});
    }
}
exports.delete = async (req, res) => {
    const _id = req.params.id;
    try {
        await Category.findByIdAndDelete(_id);
        res.redirect("/auth/category");
    } catch (error) {
        res.redirect("/auth/category");
    }
}