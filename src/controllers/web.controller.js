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
