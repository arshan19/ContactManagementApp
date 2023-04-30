const mongoose = require("mongoose");

const validator = require("validator");

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required :  true ,
        ref : "User",
    },
    name : {
        type: String,
        required: [true, "please add the Contact Name"],
        maxLength:[100, "not more than 100 character"],
        trim:true
    },
    email : {
        type: String,
        unique: true,
        required: [true, "please add the Contact Email Address"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("email is isValid")
            }
        }
    },
    phone : {
        type: String,
        unique: true,
        required: [true, "please add the contact Phone Number"],
        min: [10, 'Must be at least 10 Number']
    },
 }, {
    timestamps: true,
 });

 module.exports = mongoose.model("Contact",contactSchema);