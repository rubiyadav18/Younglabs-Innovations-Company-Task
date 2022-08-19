const router = require("express").Router();
const book  = require('../controller/book')
const { isAuthenticated } = require('../controller/user')
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "public/images"); },
filename: function (req, file, cb) {
cb(null, Date.now ( ) + file.originalname);},});

var upload = multer({ storage: storage });

// post book
router.post('/create/book', upload.single("myField"), isAuthenticated, book.postBook)

//get book
router.get("/get/book",isAuthenticated,book.getBook)

//patch api for book
router.patch("/update/book/:id",upload.single("myField"), isAuthenticated, book.UpdateBook )

//Delete api --
router.delete("/delete/book/:id",isAuthenticated,book.deleteBook)


module.exports= router