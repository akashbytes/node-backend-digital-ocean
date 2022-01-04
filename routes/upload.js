const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer({dest:'uploads/'});
const maxSize = 1 * 1000 * 1000;
const path = require("path") 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
});


var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("file"); 
      
router.post("/img-upload",async  function (req, res, next) {
    
    upload(req,res,function(err) {
        if(err) {
            res.json({
                message: err,
                status: false
            });
        }
        else {
            res.json({
                message: 'Upload Sucessfull',
                status: true
            });
        }
    });
});
    
// router.post(
//   '/img-upolad',
//   upload.single('file'),
//   (req, res, next) => {
//       console.log(req.body);
//       console.log(req.file);
//     res.json({
//         req: req
//     });
//   }
// );

module.exports = router;