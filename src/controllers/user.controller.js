const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const gmail = require("./../mails/gmail");
exports.login = (req, res)=>{
    res.render("login");
}
exports.register = (req, res)=>{
    res.render("register");
}
exports.postLogin = async (req, res)=>{
    try{
        const  {email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.send("Email or Password is not correct");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.send("Email or Password is not correct");
        }
        req.session.auth = {
            fullname: user.fullname,
            email: user.email,
            role: user.role
        }
        res.redirect("/");
    }catch(err){
        res.send(err);
    };

}
exports.postRegister = async (req, res)=>{
    try{
        const data = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password, salt);
        data.password = hashed;
        const u = new User(data);
        await u.save();

        //send email
        gmail.sendMail({
            from: "Admin NodeJS",
            to: u.email, //u.email
            cc: "",  //gui kem 
            bcc: "",
            subject: "Welcome to",
            html: "<h1>Chuc mung ban da dang ky thanh cong tai khoan NodeJS</h1>"  

        });
        res.redirect("/auth/login");
    }catch(err){
        res.send(err);
    };
}