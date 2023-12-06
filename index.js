const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const DatabaseUtil = require("./databaseUtil");
const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());
const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

function getTopFiveBooks(xParam, yParam, BookData) {
  const BookDataWithDistance = BookData.map((value, index) => {
    return {
      ...value._doc,
      distance: 0,
    };
  });
  for (const book of BookDataWithDistance) {
    book.distance = Math.sqrt(
      Math.pow(xParam - book.xParam, 2) + Math.pow(yParam - book.yParam, 2)
    );
  }
  const sortedBooks = BookDataWithDistance.sort(
    (bookA, bookB) => bookA.distance - bookB.distance
  );
  const topFiveBooks = sortedBooks.slice(0, 5);
  return topFiveBooks;
}
app.post("/getBooks", async (req, res) => {
  const data = req.body;
  const books = await DatabaseUtil.books.retrieveBooks();
  const sortedBooks = getTopFiveBooks(data.xParam, data.yParam, books);
  const bookValues = [];
  const bookNames = [];
  console.log(sortedBooks);
  for (const id in sortedBooks) {
    bookValues.push([sortedBooks[id].xParam, sortedBooks[id].yParam]);
    bookNames.push(sortedBooks[id].bookTitle);
  }

  console.log(bookValues);
  res.json({
    bookValues: bookValues,
    bookNames: bookNames,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
