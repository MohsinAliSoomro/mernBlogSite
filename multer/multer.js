const multer = require('multer');
const DIR = './uploads/';

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
exports.upload = multer({
    storage: Storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})