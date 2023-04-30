const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    // user_id : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     required :  true ,
    //     ref : "User",
    // },
    name: {
        type: String, 
        required: true
    },
    // image: {
    //     data: Buffer,       // buffer is like binary data,
    //     contentType: String // our image is save as buffer in mongoDB
    // }
});
const ImageModel = mongoose.model('imageModel',ImageSchema)
module.exports =  ImageModel;