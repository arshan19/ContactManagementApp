const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please add the user name"],
        maxLength:[100, "not more than 100 character"],
        trim:true
      },
      email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("email is isValid")
            }
        }
      },
      password: {
        type: String,
        required: [true, "Please add the user password"],
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("User", userSchema);