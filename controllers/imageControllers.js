const ImageModel = require("../models/imageUploadModel");
const multer = require("multer");

//storage
const Storage = multer.diskStorage({
    destination: 'uploads', //it will create a folder uploads and store the file inside in it. 
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const maxSize = 2 * 1024 * 1024 // 2MB

const upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          cb(null, true);
        } else {
          //cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
      },
    limits: { fileSize: maxSize }
}).single('testImage'); //remember this name , you going to upload images using this name.

const uploadImages = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            console.log(req.file);
            const newImage = new ImageModel({
                name: req.file.filename,
                // image: {
                //     data: req.file.filename,
                // }
            })
            newImage.save()
                .then(() => res.send("Successfully Uploaded!"))
                .catch((error) => console.log(error));
        }
    })
}

module.exports = uploadImages;