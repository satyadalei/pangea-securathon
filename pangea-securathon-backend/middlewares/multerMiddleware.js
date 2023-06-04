const multer = require('multer');
const upload = multer({
    // set file limit
    limits: {
        fileSize: 1024 * 1024 * 10 // 10 MB max size
    },
    fileFilter: function (req, file, callBackFn) {
        const fileType = file.mimetype;
        if (fileType === "image/jpeg" || "image/png") {
            callBackFn(null, true);
        } else {
            callBackFn(new Error("You have not entered valid file"));
        }
    },
    // store files in the memory as buffer instead of storing in disk
    storage: multer.memoryStorage()
})

module.exports = upload;