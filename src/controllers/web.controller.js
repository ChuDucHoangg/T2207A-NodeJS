const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const gmail = require("./../mails/gmail");
exports.home = (req,res) =>{
    // res.send("Hello T2207A");
    var className = "T2207A";
    var students = [
        "Phung Van Vu",
        "Tring Van Trung",
        "Nguyen Van An"
    ]
    res.render("home", {
        abcxyz: className,
        students: students
    });
}
exports.change = (req, res) => {
    res.render("change");
}

exports.postChangePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;
        const user = await User.findOne({email: req.session.auth.email});
        if (!user) {
            return res.send("Khong tim thay nguoi dung");
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.send("Mat khau cu khong dung");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedNewPassword;
        await user.save();
        gmail.sendMail({
            from: "Admin NodeJS",
            to: user.email,  
            subject: "Warning Changed Password",
            html: "<h1>Mau khau cua ban da duoc thay doi</h1>"  
        });
        res.redirect("/"); 
    } catch (err) {
        res.send(err);
    }
}


exports.about = (req, res) =>{
    // res.send("About US");
    res.render("about")
}

exports.login = (req, res) =>{
    res.render("login")
}

exports.register = (req, res) =>{
    res.render("register")
}
