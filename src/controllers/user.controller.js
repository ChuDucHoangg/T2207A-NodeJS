exports.login = (req, res)=>{
    res.render("login");
}
exports.register = (req, res)=>{
    res.render("register");
}
exports.postLogin = (req, res)=>{
    res.send("done");
}
exports.postRegister = (req, res)=>{
    res.send("done");
}