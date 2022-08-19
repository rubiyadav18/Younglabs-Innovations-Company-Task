// const book = require("../modles/book");
const books = require("../modle/books");

//post API for book
const postBook = async (req, res) => {
  console.log("enter")
  let photo = req.body
  let { bookName, bookPrize, Authorname, pages, } = photo;
  console.log(req.file)
  const path = req.file.destination + "/" + req.file.originalname
  if(!path) throw new Error('no  images file')
  console.log(path)

  // return

  try {
    if (!(bookName && bookPrize &&  Authorname && pages)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await books.create({
        bookName,
        bookPrize,
        Authorname,
        pages,
        Book_Images:path
      });

      if (!getResponce) {
        res.status(400).json({ message: "Books  is not created", status: false });
      } else {
        res.status(200).json({
          message: "Books is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//getAll books

const getBook = async (req, res) => {
    let page = (req.query.page*10)-10
    try {
      const book = await books.find().limit(10).skip(page);
      if (!book) {
        res.json({ message: "there is no book", status: false });
      }
      res.json({
        message: "Found the Books details ",
        data: book,
        status: true,
      });
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };
  

//patch api  for book

const UpdateBook = async (req, res) => {
  let photo = req.body
  
    let { bookName, bookPrize, Authorname,pages} = photo;
    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname
    if(!path) throw new Error('no  images file')
    console.log(path)
    try {
      const book = await books.findOneAndUpdate({ id: req.params.id }
        , {bookName, bookPrize, Authorname,pages, Book_Images:path});
      if (!book) {
        res.json({ message: "Enter the correct id", status: false });
      } else {
        res.json({
          message: "Book has updated successsfully",
          data: book,
          status: true,
        });
      }
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };
  

//Delete api 

const deleteBook = async (req, res) => {
    try {
      const book = await books.findOneAndDelete({ id: req.params.id });
      if (!book) {
        res.json({ message: "Enter the correct id", status: false });
      } else {
        res.send({ message: "Books has deleted successfully", status: true });
      }
    } catch (error) {
      res.send({ message: error.message, status: false });
    }
  };
  


  module.exports = {
    postBook,
    getBook,
    UpdateBook ,
    deleteBook

  }