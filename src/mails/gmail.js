const nodemailer = require("nodemailer");
const config = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "hoangcdth2205001@fpt.edu.vn",
        pass: "yztxbrzhkrvtordj"
    }
}
const transport = nodemailer.createTransport(config);
module.exports = transport;