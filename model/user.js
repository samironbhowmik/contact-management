const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
//   firstname: String,
//   lastname: String,
//   email: String,
//   phone: Number,
    id:String,
    firstname:{
        type:String,
        required:[true],
    },
    lastname:{
        type:String,
        required:[true],
    },
    email:{
        type:String,
        required:[true],
    },
    phone:{
        type:Number,
        required:[true],
    },


});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
