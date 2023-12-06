const BookModel = require("./models/BookModel");

const DatabaseUtil = {
  books: (function () {
    const _retrieveBooks = async () => {
      const doc = await BookModel.find({});
      return doc;
    };
    return {
      retrieveBooks: _retrieveBooks,
    };
  })(),
};

module.exports = DatabaseUtil;
