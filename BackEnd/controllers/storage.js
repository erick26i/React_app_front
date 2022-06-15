const path = require("path");
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
      cb(null, 'new-task' + '-' + Date.now() + '-' + 'id'+ req.params.id + path.extname(file.originalname))
    }
  })

module.exports = {
    storage
  }
