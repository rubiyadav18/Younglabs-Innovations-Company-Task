const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({

  bookName: { type: String},
  bookPrize: { type: String },
  Authorname: { type: String},
  Book_Images:{ type: String },
  pages:{type:String}


});


module.exports = mongoose.model("book", booksSchema);
