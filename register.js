const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reg: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        required: true
    }
});

const Register = mongoose.model("userData", userData);
module.exports = Register;
