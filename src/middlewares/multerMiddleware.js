const multer = require("multer");
const path = require("path");

const storageConfigration = multer.diskStorage({
	destination: (req, file, next) => {
		console.log(file);
		next(null, "uploads/");
	},
	filename: (req, file, next) => {
		next(null, `${Date.now()}${path.extname(file.originalname)}`);
	},
});
const uploader = multer({ storage: storageConfigration });

// const uploader = multer({
// 	dest: "uploads/",
// });
module.exports = uploader;
